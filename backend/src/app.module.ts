import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PlantModule } from './plant/plant.module';
import { HrModule } from './hr/hr.module';
import { SeedModule } from './seed/seed.module';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'quawaco.db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    DashboardModule,
    PlantModule,
    HrModule,
    SeedModule,
  ],
})
export class AppModule { }

