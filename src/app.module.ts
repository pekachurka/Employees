import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    EmployeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/employee-database'),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
