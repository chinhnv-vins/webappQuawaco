import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  plant: string;
  salary: number; // VNĐ
  status: 'active' | 'onleave' | 'resigned';
  joinDate: string;
  birthDate: string;
  address: string;
  gender: 'male' | 'female';
  qualityScore: number;
}

@Injectable()
export class HrService {
  private employees: Employee[] = [
    {
      id: '1', name: 'Nguyễn Văn Hùng', email: 'hung.nv@quawaco.vn', phone: '0905 123 456',
      position: 'Giám đốc nhà máy', department: 'Ban Giám đốc', plant: 'Nhà máy nước Cầu Đỏ',
      salary: 35000000, status: 'active', joinDate: '15/03/2010', birthDate: '22/08/1975',
      address: 'Quận Hải Châu, TP Đà Nẵng', gender: 'male', qualityScore: 98,
    },
    {
      id: '2', name: 'Trần Minh Đức', email: 'duc.tm@quawaco.vn', phone: '0906 234 567',
      position: 'Trưởng phòng Kỹ thuật', department: 'Phòng Kỹ thuật', plant: 'Nhà máy nước Cầu Đỏ',
      salary: 25000000, status: 'active', joinDate: '20/06/2015', birthDate: '05/11/1982',
      address: 'Quận Thanh Khê, TP Đà Nẵng', gender: 'male', qualityScore: 95,
    },
    {
      id: '3', name: 'Lê Thị Hoa', email: 'hoa.lt@quawaco.vn', phone: '0907 345 678',
      position: 'Giám sát viên', department: 'Phòng Sản xuất', plant: 'Nhà máy nước Hải Vân',
      salary: 18000000, status: 'active', joinDate: '10/01/2018', birthDate: '14/05/1990',
      address: 'Quận Liên Chiểu, TP Đà Nẵng', gender: 'female', qualityScore: 92,
    },
    {
      id: '4', name: 'Phạm Quốc Toàn', email: 'toan.pq@quawaco.vn', phone: '0908 456 789',
      position: 'Kỹ thuật viên', department: 'Phòng Vận hành', plant: 'Nhà máy nước Sân Bay',
      salary: 15000000, status: 'active', joinDate: '25/09/2020', birthDate: '30/12/1995',
      address: 'Quận Cẩm Lệ, TP Đà Nẵng', gender: 'male', qualityScore: 88,
    },
    {
      id: '5', name: 'Võ Thanh Tùng', email: 'tung.vt@quawaco.vn', phone: '0909 567 890',
      position: 'Vận hành viên', department: 'Phòng Vận hành', plant: 'Trạm bơm Túy Loan',
      salary: 12000000, status: 'active', joinDate: '05/04/2022', birthDate: '18/07/1998',
      address: 'Huyện Hòa Vang, TP Đà Nẵng', gender: 'male', qualityScore: 85,
    },
    {
      id: '6', name: 'Nguyễn Thị Lan', email: 'lan.nt@quawaco.vn', phone: '0910 678 901',
      position: 'Chuyên viên nhân sự', department: 'Phòng Nhân sự', plant: 'Nhà máy nước Cầu Đỏ',
      salary: 16000000, status: 'active', joinDate: '12/08/2019', birthDate: '25/03/1988',
      address: 'Quận Ngũ Hành Sơn, TP Đà Nẵng', gender: 'female', qualityScore: 91,
    },
    {
      id: '7', name: 'Trần Văn Nam', email: 'nam.tv@quawaco.vn', phone: '0911 789 012',
      position: 'Chuyên viên đào tạo', department: 'Phòng Đào tạo', plant: 'Nhà máy nước Cầu Đỏ',
      salary: 14000000, status: 'onleave', joinDate: '18/11/2021', birthDate: '08/06/1993',
      address: 'Quận Sơn Trà, TP Đà Nẵng', gender: 'male', qualityScore: 87,
    },
    {
      id: '8', name: 'Lê Hoàng Long', email: 'long.lh@quawaco.vn', phone: '0912 890 123',
      position: 'Kỹ sư mạng lưới', department: 'Phòng Mạng lưới', plant: 'Nhà máy nước Hòa Liên',
      salary: 20000000, status: 'active', joinDate: '03/02/2017', birthDate: '12/10/1985',
      address: 'Quận Liên Chiểu, TP Đà Nẵng', gender: 'male', qualityScore: 94,
    },
    {
      id: '9', name: 'Phạm Thị Mai', email: 'mai.pt@quawaco.vn', phone: '0913 901 234',
      position: 'Kế toán', department: 'Phòng Tài chính', plant: 'Nhà máy nước Cầu Đỏ',
      salary: 17000000, status: 'active', joinDate: '20/07/2016', birthDate: '15/01/1987',
      address: 'Quận Hải Châu, TP Đà Nẵng', gender: 'female', qualityScore: 90,
    },
    {
      id: '10', name: 'Đặng Minh Tuấn', email: 'tuan.dm@quawaco.vn', phone: '0914 012 345',
      position: 'Thợ sửa chữa', department: 'Phòng Bảo trì', plant: 'Nhà máy nước Sân Bay',
      salary: 13000000, status: 'resigned', joinDate: '08/05/2019', birthDate: '20/09/1992',
      address: 'Quận Cẩm Lệ, TP Đà Nẵng', gender: 'male', qualityScore: 82,
    },
  ];

  findAll(): Employee[] {
    return this.employees;
  }

  findOne(id: string): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  create(data: Partial<Employee>): Employee {
    const newEmp: Employee = {
      id: uuidv4(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      position: data.position || '',
      department: data.department || '',
      plant: data.plant || '',
      salary: data.salary || 0,
      status: data.status || 'active',
      joinDate: data.joinDate || '',
      birthDate: data.birthDate || '',
      address: data.address || '',
      gender: data.gender || 'male',
      qualityScore: data.qualityScore || 0,
    };
    this.employees.push(newEmp);
    return newEmp;
  }

  update(id: string, data: Partial<Employee>): Employee | null {
    const idx = this.employees.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.employees[idx] = { ...this.employees[idx], ...data, id };
    return this.employees[idx];
  }

  delete(id: string): boolean {
    const idx = this.employees.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.employees.splice(idx, 1);
    return true;
  }
}
