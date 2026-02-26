import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  // Helper: generate a seed number from filter values to vary data
  private getSeed(filters: Record<string, string>): number {
    const str = Object.values(filters).filter(v => v && v !== 'Tất cả').join('');
    if (!str) return 1;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 10) / 10 + 0.5; // Returns 0.5 to 1.4
  }

  // Helper: vary a number by seed
  private vary(val: number, seed: number, variance = 0.3): number {
    return Math.round(val * (1 + (seed - 1) * variance));
  }

  // Helper: vary an array of numbers
  private varyArr(arr: number[], seed: number): number[] {
    return arr.map((v, i) => this.vary(v, seed + (i % 3) * 0.1));
  }

  // Helper: get active filter label for display
  private getActiveFilters(filters: Record<string, string>): string[] {
    return Object.entries(filters)
      .filter(([_, v]) => v && v !== 'Tất cả')
      .map(([_, v]) => v);
  }

  getGeneralData() {
    return {
      title: 'TRUNG TÂM ĐIỀU HÀNH THÔNG MINH QUAWACO',
      subtitle: 'QUAWACO INTELLIGENT OPERATIONS CENTER',
      modules: [
        { id: 'general', name: 'Điều hành chung', icon: 'settings', path: '/dashboard' },
        { id: 'production', name: 'Điều hành Sản xuất', icon: 'factory', path: '/dashboard/production' },
        { id: 'business', name: 'Điều hành Kinh doanh', icon: 'chart-bar', path: '/dashboard/business' },
        { id: 'network', name: 'Điều hành Mạng lưới', icon: 'network', path: '/dashboard/network' },
        { id: 'hr', name: 'Điều hành Nhân sự', icon: 'users', path: '/dashboard/hr' },
        { id: 'agent', name: 'Điều hành Nhân viên số', icon: 'robot', path: '/dashboard/agent' },
        { id: 'cleaning', name: 'Làm sạch Dữ liệu', icon: 'refresh', path: '/dashboard/cleaning' },
        { id: 'leakage', name: 'Quản lý thất thoát', icon: 'droplet', path: '/dashboard/leakage' },
      ],
    };
  }

  getProductionData(filters: Record<string, string> = {}) {
    const s = this.getSeed(filters);
    const active = this.getActiveFilters(filters);
    return {
      title: 'ĐIỀU HÀNH SẢN XUẤT',
      activeFilters: active,
      filters: {
        nhaMay: ['Tất cả', 'Nhà máy Cầu Đỏ', 'Nhà máy Sân Bay', 'Nhà máy Hải Vân'],
        khuVuc: ['Tất cả', 'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
        soLieu: ['Tất cả', 'Thời gian thực', 'Hàng ngày', 'Hàng tháng'],
        khau: ['Tất cả', 'Khâu xử lý nước', 'Khâu phân phối', 'Khâu kiểm tra'],
        boPhan: ['Tất cả', 'Bộ phận Sản xuất', 'Bộ phận Kỹ thuật', 'Bộ phận Chất lượng'],
      },
      topPages: [
        { name: 'Sản lượng', value: this.vary(5678, s), change: +(15.1 * s).toFixed(1), icon: 'home' },
        { name: 'Chất lượng', value: this.vary(3456, s), change: +(-1.1 * s).toFixed(1), icon: 'user' },
        { name: 'Hiệu suất', value: this.vary(2345, s), change: +(8.2 * s).toFixed(1), icon: 'mail' },
        { name: 'Chi phí', value: this.vary(1132, s), change: +(-3.4 * s).toFixed(1), icon: 'dollar' },
      ],
      conversionRate: {
        data: [
          { label: 'Nước sạch đạt chuẩn', value: this.vary(57, s, 0.15), color: '#f472b6' },
          { label: 'Đang xử lý', value: this.vary(32, s, 0.15), color: '#facc15' },
          { label: 'Cần kiểm tra', value: this.vary(31, s, 0.15), color: '#818cf8' },
        ],
      },
      avgSessionDuration: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
        duration: this.varyArr([85, 95, 70, 80, 110, 90, 75, 100], s),
        totalVisitors: this.varyArr([40, 55, 35, 60, 70, 45, 50, 65], s),
        newVisitors: this.varyArr([20, 30, 15, 35, 40, 25, 30, 35], s),
      },
      salesThisMonth: {
        value: this.vary(14094000, s),
        change: +(4.6 * s).toFixed(1),
        goal: this.vary(48346000, s),
        labels: ['T1 04', 'T1 07', 'T1 10', 'T1 13', 'T1 16'],
        data: this.varyArr([10000000, 17000000, 13500000, 20500000, 24000000], s),
      },
      discountedSales: {
        value: this.vary(3706000, s),
        change: +(2.0 * s).toFixed(1),
        labels: ['T1 04', 'T1 07', 'T1 10', 'T1 13', 'T1 16'],
        data: this.varyArr([346000, 351000, 357000, 340000, 362000], s),
      },
      leadsAccount: [
        { account: '****882', amount: this.vary(249990, s, 0.2), type: 'Thanh toán NH', date: '17/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****776', amount: this.vary(199990, s, 0.2), type: 'Thanh toán NH', date: '15/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****553', amount: this.vary(249990, s, 0.2), type: 'Thanh toán NH', date: '12/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****441', amount: this.vary(99990, s, 0.2), type: 'Thanh toán NH', date: '10/01/2022', membership: 'Thành viên', status: 'Pending' },
        { account: '****339', amount: this.vary(299990, s, 0.2), type: 'Thanh toán NH', date: '08/01/2022', membership: 'Thành viên', status: 'Cancelled' },
      ],
    };
  }

  getBusinessData(filters: Record<string, string> = {}) {
    const s = this.getSeed(filters);
    const active = this.getActiveFilters(filters);
    return {
      title: 'ĐIỀU HÀNH KINH DOANH',
      activeFilters: active,
      filters: {
        nhaMay: ['Tất cả', 'Nhà máy Cầu Đỏ', 'Nhà máy Sân Bay', 'Nhà máy Hải Vân'],
        khuVuc: ['Tất cả', 'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
        soLieu: ['Tất cả', 'Thời gian thực', 'Hàng ngày', 'Hàng tháng'],
        khau: ['Tất cả', 'Khâu thu phí', 'Khâu tính toán', 'Khâu thanh toán'],
        boPhan: ['Tất cả', 'Bộ phận Kinh doanh', 'Bộ phận Thu ngân', 'Bộ phận CSKH'],
      },
      trafficSource: {
        organicSearch: this.vary(83, s, 0.1),
        paidSearch: this.vary(17, s, 0.1),
        total: this.vary(325000, s),
      },
      conversionSource: {
        channels: [
          { name: 'QC mạng XH', sales: this.vary(310, s), signUp: this.vary(60, s), purchase: this.vary(80, s), newsletter: this.vary(40, s) },
          { name: 'Tìm kiếm TN', sales: this.vary(1420, s), signUp: this.vary(70, s), purchase: this.vary(50, s), newsletter: this.vary(30, s) },
          { name: 'QC trả phí', sales: this.vary(1920, s), signUp: this.vary(80, s), purchase: this.vary(60, s), newsletter: this.vary(50, s) },
        ],
      },
      visitorsByLocation: {
        locations: [
          { name: 'Hải Châu', data: this.varyArr([40, 60, 80, 100, 70], s) },
          { name: 'Thanh Khê', data: this.varyArr([30, 50, 70, 90, 60], s) },
          { name: 'Sơn Trà', data: this.varyArr([20, 40, 60, 80, 50], s) },
          { name: 'Ngũ Hành Sơn', data: this.varyArr([10, 30, 50, 70, 40], s) },
        ],
        years: [2021, 2022, 2023, 2024, 2025],
      },
      avgVisitors: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        data: this.varyArr([120, 80, 160, 214, 140, 90, 110], s),
        average: this.vary(130, s),
      },
      avgTime: {
        onSite: { value: this.vary(23, s), unit: 'phút', change: +(25.1 * s).toFixed(1) },
        onPage: { value: this.vary(7, s), unit: 'phút', change: +(12.0 * s).toFixed(1) },
        onNewsletter: { value: this.vary(3, s), unit: 'phút', change: +(-2.1 * s).toFixed(1) },
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        data: [
          this.varyArr([30, 40, 50, 60, 45, 35, 25], s),
          this.varyArr([20, 25, 35, 40, 30, 20, 15], s),
          this.varyArr([10, 15, 20, 25, 20, 15, 10], s),
        ],
      },
      uniqueVisitors: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        data: this.varyArr([180, 200, 350, 428, 250, 150, 280], s),
        average: this.vary(262, s),
      },
      leadsAccount: [
        { account: '****882', amount: this.vary(249990, s, 0.2), type: 'Thanh toán NH', date: '17/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****776', amount: this.vary(199990, s, 0.2), type: 'Thanh toán NH', date: '15/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****553', amount: this.vary(249990, s, 0.2), type: 'Thanh toán NH', date: '12/01/2022', membership: 'Thành viên', status: 'Completed' },
        { account: '****441', amount: this.vary(99990, s, 0.2), type: 'Thanh toán NH', date: '10/01/2022', membership: 'Thành viên', status: 'Pending' },
        { account: '****339', amount: this.vary(299990, s, 0.2), type: 'Thanh toán NH', date: '08/01/2022', membership: 'Thành viên', status: 'Cancelled' },
      ],
    };
  }

  getNetworkData(filters: Record<string, string> = {}) {
    const s = this.getSeed(filters);
    const active = this.getActiveFilters(filters);
    return {
      title: 'ĐIỀU HÀNH MẠNG LƯỚI',
      activeFilters: active,
      filters: {
        nhaMay: ['Tất cả', 'Nhà máy Cầu Đỏ', 'Nhà máy Sân Bay', 'Nhà máy Hải Vân'],
        khuVuc: ['Tất cả', 'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
        soLieu: ['Tất cả', 'Thời gian thực', 'Hàng ngày', 'Hàng tháng'],
        khau: ['Tất cả', 'Khâu vận hành', 'Khâu bảo trì', 'Khâu giám sát'],
        boPhan: ['Tất cả', 'Bộ phận Mạng lưới', 'Bộ phận Đo lường', 'Bộ phận Sửa chữa'],
      },
      totalRevenue: {
        value: +(101.23 * s).toFixed(2),
        unit: 'TRIỆU ĐỒNG',
        profitLoss: this.vary(55, s, 0.15),
        monthRange: 'THÁNG 1 - THÁNG 8',
        year: 2018,
        breakdown: [
          { label: 'T1', value: this.vary(25, s), color: '#f472b6' },
          { label: 'T2', value: this.vary(20, s), color: '#818cf8' },
          { label: 'T3', value: this.vary(15, s), color: '#34d399' },
          { label: 'T4', value: this.vary(10, s), color: '#facc15' },
        ],
      },
      totalProductivity: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        profitPerHour: this.varyArr([20, 25, 35, 45, 40, 50], s),
      },
      dateTime: '19/08/2018 13:55:18',
      todaySales: { percentage: this.vary(75, s, 0.15), total: this.vary(14, s), label: 'Sản phẩm' },
      dailyVisitors: { percentage: this.vary(60, s, 0.15), total: this.vary(1250, s), label: 'Khách' },
      monthlySaleReport: {
        labels: ['T4', 'T5', 'T6', 'T7'],
        data: this.varyArr([30, 45, 55, 70], s),
      },
      ordersTrack: { total: this.vary(512, s), label: 'Đơn' },
      pendingOrders: { percentage: this.vary(30, s, 0.15), total: this.vary(105, s), label: 'Đơn' },
      newUsers: [
        { name: 'NGUYỄN VĂN HÙNG', role: 'Quản lý dự án', joinedDate: '22/07', avatar: '' },
        { name: 'TRẦN MINH ĐỨC', role: 'Kỹ sư mạng', joinedDate: '19/07', avatar: '' },
        { name: 'LÊ THỊ HOA', role: 'Giám sát viên', joinedDate: '12/07', avatar: '' },
        { name: 'PHẠM QUỐC TOÀN', role: 'Kỹ thuật viên', joinedDate: '24/01', avatar: '' },
        { name: 'VÕ THANH TÙNG', role: 'Vận hành viên', joinedDate: '15/05', avatar: '' },
      ],
      mapCenter: { lat: 16.0544, lng: 108.2022 },
      mapZoom: 12,
    };
  }

  getHrData(filters: Record<string, string> = {}) {
    const s = this.getSeed(filters);
    const active = this.getActiveFilters(filters);
    return {
      title: 'ĐIỀU HÀNH NHÂN SỰ',
      activeFilters: active,
      filters: {
        nhaMay: ['Tất cả', 'Nhà máy Cầu Đỏ', 'Nhà máy Sân Bay', 'Nhà máy Hải Vân'],
        khuVuc: ['Tất cả', 'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
        soLieu: ['Tất cả', 'Thời gian thực', 'Hàng ngày', 'Hàng tháng'],
        khau: ['Tất cả', 'Khâu tuyển dụng', 'Khâu đào tạo', 'Khâu đánh giá'],
        boPhan: ['Tất cả', 'Bộ phận Nhân sự', 'Bộ phận Đào tạo', 'Bộ phận Hành chính'],
      },
      kpiCards: [
        { label: 'Lượt xem', value: this.vary(50800, s), change: +(28.4 * s).toFixed(1), icon: 'eye' },
        { label: 'Nhân viên/tháng', value: this.vary(23600, s), change: +(12.6 * s).toFixed(1), icon: 'users' },
        { label: 'Đăng ký mới', value: this.vary(756, s), change: +(3.1 * s).toFixed(1), icon: 'user-plus' },
        { label: 'Đăng ký DV', value: this.vary(2300, s), change: +(-11.2 * s).toFixed(1), icon: 'bell' },
      ],
      totalRevenue: {
        value: this.vary(240800000, s),
        change: +(24.5 * s).toFixed(1),
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        revenue: this.varyArr([50000000, 80000000, 60000000, 90000000, 120000000, 150000000, 200000000, 220000000, 190000000, 210000000, 230000000, 240800000], s),
        expenses: this.varyArr([30000000, 50000000, 40000000, 60000000, 70000000, 80000000, 100000000, 110000000, 95000000, 105000000, 115000000, 125000000], s),
        period: 'T6 2024 - T12 2024',
      },
      totalProfit: {
        value: this.vary(144600000, s),
        change: +(28.9 * s).toFixed(1),
        labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM', '11 PM'],
        data: this.varyArr([5000000, 15000000, 25000000, 18000000, 22000000, 12000000, 8000000], s),
      },
      totalSessions: {
        value: this.vary(400, s),
        change: +(18.8 * s).toFixed(1),
        labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM', '11 PM'],
        data: this.varyArr([50, 100, 200, 280, 350, 300, 400], s),
      },
      sideRevenue: {
        value: +(101.23 * s).toFixed(2),
        unit: 'TRIỆU ĐỒNG',
        profitLoss: this.vary(55, s, 0.15),
        monthRange: 'THÁNG 1 - THÁNG 8',
        year: 2018,
        breakdown: [
          { label: 'T1', value: this.vary(25, s), color: '#f472b6' },
          { label: 'T2', value: this.vary(20, s), color: '#818cf8' },
          { label: 'T3', value: this.vary(15, s), color: '#34d399' },
          { label: 'T4', value: this.vary(10, s), color: '#facc15' },
          { label: 'T5', value: this.vary(8, s), color: '#f97316' },
          { label: 'T6', value: this.vary(12, s), color: '#06b6d4' },
          { label: 'T7', value: this.vary(5, s), color: '#a78bfa' },
          { label: 'T8', value: this.vary(5, s), color: '#fb923c' },
        ],
      },
      newUsers: [
        { name: 'NGUYỄN THỊ LAN', role: 'Quản lý nhân sự', joinedDate: '22/07', avatar: '' },
        { name: 'TRẦN VĂN NAM', role: 'Chuyên viên đào tạo', joinedDate: '19/07', avatar: '' },
        { name: 'LÊ HOÀNG LONG', role: 'Giám sát viên', joinedDate: '12/07', avatar: '' },
        { name: 'PHẠM THỊ MAI', role: 'Kế toán nhân sự', joinedDate: '24/06', avatar: '' },
        { name: 'VÕ MINH TUẤN', role: 'Hành chính', joinedDate: '15/07', avatar: '' },
      ],
    };
  }

  getAgentData(filters: Record<string, string> = {}) {
    const s = this.getSeed(filters);
    const active = this.getActiveFilters(filters);
    return {
      title: 'ĐIỀU HÀNH NHÂN VIÊN SỐ (AI AGENT)',
      activeFilters: active,
      filters: {
        nhaMay: ['Tất cả', 'Nhà máy Cầu Đỏ', 'Nhà máy Sân Bay', 'Nhà máy Hải Vân'],
        khuVuc: ['Tất cả', 'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn'],
        soLieu: ['Tất cả', 'Thời gian thực', 'Hàng ngày', 'Hàng tháng'],
        khau: ['Tất cả', 'Khâu phân tích', 'Khâu cảnh báo', 'Khâu báo cáo'],
        nhanVienSo: ['Tất cả', 'Agent Chất lượng', 'Agent Vận hành', 'Agent Phân phối'],
      },
      totalRevenue: {
        value: +(101.23 * s).toFixed(2),
        unit: 'TRIỆU ĐỒNG',
        profitLoss: this.vary(55, s, 0.15),
        monthRange: 'THÁNG 1 - THÁNG 8',
        year: 2018,
        breakdown: [
          { label: 'T1', value: this.vary(25, s), color: '#f472b6' },
          { label: 'T2', value: this.vary(20, s), color: '#818cf8' },
          { label: 'T3', value: this.vary(15, s), color: '#34d399' },
          { label: 'T4', value: this.vary(10, s), color: '#facc15' },
          { label: 'T5', value: this.vary(8, s), color: '#f97316' },
          { label: 'T6', value: this.vary(12, s), color: '#06b6d4' },
          { label: 'T7', value: this.vary(5, s), color: '#a78bfa' },
          { label: 'T8', value: this.vary(5, s), color: '#fb923c' },
        ],
      },
      dataCards: [
        { value: this.vary(1544, s), title: 'Xử lý yêu cầu', data: this.varyArr([20, 35, 45, 30, 55, 40, 60, 50], s), color: '#facc15' },
        { value: this.vary(2487, s), title: 'Phản hồi tự động', data: this.varyArr([30, 50, 40, 60, 70, 55, 65, 80], s), color: '#06b6d4' },
        { value: this.vary(1544, s), title: 'Cảnh báo phát hiện', data: this.varyArr([15, 25, 35, 28, 40, 32, 45, 38], s), color: '#22c55e' },
      ],
      waveChart: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
        datasets: [
          { label: 'Dữ liệu 01', data: this.varyArr([30, 50, 40, 70, 55, 80, 65, 90], s), color: '#06b6d4' },
          { label: 'Dữ liệu 02', data: this.varyArr([20, 35, 30, 50, 40, 60, 50, 70], s), color: '#facc15' },
          { label: 'Dữ liệu 03', data: this.varyArr([10, 25, 20, 40, 30, 50, 40, 55], s), color: '#f472b6' },
        ],
      },
      circularProgress: {
        title: 'Hiệu suất AI',
        value: this.vary(64, s, 0.15),
        label: 'Tỷ lệ phản hồi chính xác',
      },
      horizontalBars: [
        { label: 'Xử lý nước', value: this.vary(85, s, 0.1), color: '#06b6d4' },
        { label: 'Phân phối', value: this.vary(72, s, 0.1), color: '#22c55e' },
        { label: 'Bảo trì', value: this.vary(60, s, 0.1), color: '#facc15' },
        { label: 'Chất lượng', value: this.vary(90, s, 0.1), color: '#8b5cf6' },
        { label: 'Vận hành', value: this.vary(78, s, 0.1), color: '#f472b6' },
      ],
      activities: [
        { time: '09:30', text: 'AI Agent hoàn thành phân tích chất lượng nước đầu vào tại NM1', type: 'success' },
        { time: '10:15', text: 'Phát hiện bất thường áp suất tuyến ống chính khu vực 2', type: 'warning' },
        { time: '11:00', text: 'Tự động điều chỉnh lượng hóa chất xử lý theo dữ liệu thời gian thực', type: 'info' },
        { time: '14:20', text: 'Báo cáo tổng hợp sản lượng nước sạch gửi đến quản lý', type: 'success' },
      ],
      calendar: { month: 'Tháng 1', year: 2025, events: [5, 12, 18, 22, 28] },
      progressIndicators: [
        { label: 'Dữ liệu xử lý', value: this.vary(40, s, 0.2) },
        { label: 'Cảnh báo', value: this.vary(75, s, 0.2) },
        { label: 'Bảo trì', value: this.vary(20, s, 0.2) },
        { label: 'Vận hành', value: this.vary(80, s, 0.2) },
        { label: 'Chất lượng', value: this.vary(60, s, 0.2) },
      ],
      newUsers: [
        { name: 'NGUYỄN VĂN A', role: 'Quản lý dự án', joinedDate: '22/07', avatar: '' },
        { name: 'TRẦN THỊ B', role: 'Quản lý dự án', joinedDate: '19/07', avatar: '' },
        { name: 'LÊ QUANG C', role: 'Quản lý dự án', joinedDate: '12/07', avatar: '' },
        { name: 'PHẠM THỊ D', role: 'Quản lý dự án', joinedDate: '24/06', avatar: '' },
        { name: 'VÕ VĂN E', role: 'Quản lý dự án', joinedDate: '15/05', avatar: '' },
      ],
    };
  }
}
