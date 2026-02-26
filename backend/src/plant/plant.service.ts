import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Plant {
  id: string;
  name: string;
  location: string;
  capacity: number;       // m³/ngày
  currentOutput: number;  // m³/ngày
  status: 'active' | 'maintenance' | 'inactive';
  manager: string;
  phone: string;
  operatingCost: number;  // VNĐ/tháng
  revenue: number;        // VNĐ/tháng
  employeeCount: number;
  waterQualityScore: number; // 0-100
  establishedYear: number;
  lastMaintenance: string;
  description: string;
}

@Injectable()
export class PlantService {
  private plants: Plant[] = [
    {
      id: '1',
      name: 'Nhà máy nước Cầu Đỏ',
      location: 'Đường Tôn Đức Thắng, Quận Liên Chiểu, TP Đà Nẵng',
      capacity: 120000,
      currentOutput: 105000,
      status: 'active',
      manager: 'Nguyễn Văn Hùng',
      phone: '0236 3842 567',
      operatingCost: 2850000000,
      revenue: 4200000000,
      employeeCount: 245,
      waterQualityScore: 96,
      establishedYear: 1985,
      lastMaintenance: '15/01/2025',
      description: 'Nhà máy nước lớn nhất Đà Nẵng, cung cấp nước sạch cho khu vực trung tâm thành phố.',
    },
    {
      id: '2',
      name: 'Nhà máy nước Sân Bay',
      location: 'Quận Cẩm Lệ, TP Đà Nẵng',
      capacity: 60000,
      currentOutput: 52000,
      status: 'active',
      manager: 'Trần Minh Đức',
      phone: '0236 3956 123',
      operatingCost: 1450000000,
      revenue: 2100000000,
      employeeCount: 128,
      waterQualityScore: 94,
      establishedYear: 2002,
      lastMaintenance: '08/02/2025',
      description: 'Nhà máy nước phục vụ khu vực phía Nam thành phố và khu công nghiệp.',
    },
    {
      id: '3',
      name: 'Nhà máy nước Hải Vân',
      location: 'Chân đèo Hải Vân, Quận Liên Chiểu, TP Đà Nẵng',
      capacity: 30000,
      currentOutput: 25000,
      status: 'active',
      manager: 'Lê Thị Hoa',
      phone: '0236 3741 890',
      operatingCost: 780000000,
      revenue: 1050000000,
      employeeCount: 67,
      waterQualityScore: 98,
      establishedYear: 2010,
      lastMaintenance: '20/12/2024',
      description: 'Nhà máy nước khai thác nguồn nước ngầm từ chân đèo Hải Vân, chất lượng cao.',
    },
    {
      id: '4',
      name: 'Nhà máy nước Hòa Liên',
      location: 'Xã Hòa Liên, Huyện Hòa Vang, TP Đà Nẵng',
      capacity: 80000,
      currentOutput: 0,
      status: 'maintenance',
      manager: 'Phạm Quốc Toàn',
      phone: '0236 3698 456',
      operatingCost: 450000000,
      revenue: 0,
      employeeCount: 85,
      waterQualityScore: 0,
      establishedYear: 2020,
      lastMaintenance: '01/02/2025',
      description: 'Nhà máy mới đang trong giai đoạn bảo trì nâng cấp hệ thống xử lý.',
    },
    {
      id: '5',
      name: 'Trạm bơm Túy Loan',
      location: 'Xã Hòa Phong, Huyện Hòa Vang, TP Đà Nẵng',
      capacity: 45000,
      currentOutput: 38000,
      status: 'active',
      manager: 'Võ Thanh Tùng',
      phone: '0236 3587 234',
      operatingCost: 920000000,
      revenue: 1380000000,
      employeeCount: 52,
      waterQualityScore: 92,
      establishedYear: 1998,
      lastMaintenance: '10/01/2025',
      description: 'Trạm bơm cấp nước cho khu vực nông thôn phía Tây thành phố.',
    },
  ];

  findAll(): Plant[] {
    return this.plants;
  }

  findOne(id: string): Plant {
    const plant = this.plants.find(p => p.id === id);
    if (!plant) throw new NotFoundException('Không tìm thấy nhà máy');
    return plant;
  }

  create(data: Partial<Plant>): Plant {
    const newPlant: Plant = {
      id: uuidv4(),
      name: data.name || '',
      location: data.location || '',
      capacity: data.capacity || 0,
      currentOutput: data.currentOutput || 0,
      status: data.status || 'inactive',
      manager: data.manager || '',
      phone: data.phone || '',
      operatingCost: data.operatingCost || 0,
      revenue: data.revenue || 0,
      employeeCount: data.employeeCount || 0,
      waterQualityScore: data.waterQualityScore || 0,
      establishedYear: data.establishedYear || new Date().getFullYear(),
      lastMaintenance: data.lastMaintenance || '',
      description: data.description || '',
    };
    this.plants.push(newPlant);
    return newPlant;
  }

  update(id: string, data: Partial<Plant>): Plant {
    const idx = this.plants.findIndex(p => p.id === id);
    if (idx === -1) throw new NotFoundException('Không tìm thấy nhà máy');
    this.plants[idx] = { ...this.plants[idx], ...data, id };
    return this.plants[idx];
  }

  remove(id: string): { success: boolean; message: string } {
    const idx = this.plants.findIndex(p => p.id === id);
    if (idx === -1) throw new NotFoundException('Không tìm thấy nhà máy');
    this.plants.splice(idx, 1);
    return { success: true, message: 'Đã xoá nhà máy thành công' };
  }
}
