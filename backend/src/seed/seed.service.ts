import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    const users = [
      { username: 'admin', password: 'Admin@123', fullName: 'Administrator', role: 'admin', avatar: '' },
      { username: 'nguyenvana', password: 'User@123', fullName: 'Nguyễn Văn A', role: 'user', avatar: '' },
      { username: 'tranthib', password: 'User@123', fullName: 'Trần Thị B', role: 'user', avatar: '' },
      { username: 'lequangc', password: 'User@123', fullName: 'Lê Quang C', role: 'user', avatar: '' },
      { username: 'phamthid', password: 'User@123', fullName: 'Phạm Thị D', role: 'user', avatar: '' },
    ];

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
    }

    console.log('✅ Seeded 5 user accounts');
  }
}
