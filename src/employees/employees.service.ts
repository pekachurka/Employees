import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './schema/employee.entity'; 
import { Model, mongo } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PagintaionQueryDto } from 'src/common/dto/pagintaion-query.dto';

@Injectable()
export class EmployeesService {

    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<Employee>){}
    
   async getAllEmployees(pagintaionQuery: PagintaionQueryDto){   
       const {limit, offset} = pagintaionQuery;
       const employees = await this.employeeModel.find({isActive: true}).skip(offset).limit(limit).exec();
       return employees;
   }

   async getAllDeletedEmployees(pagintaionQuery: PagintaionQueryDto){
       const {limit, offset} = pagintaionQuery;
       const deletedEmployees = await this.employeeModel.find({isActive: false}).skip(offset).limit(limit).exec();
       return deletedEmployees;
   }

   async findOneEmployee(id: string){
      const employee = await this.employeeModel.findOne({_id: id}).exec();

      if(!employee)
          throw new NotFoundException(`Employee with id number: ${id} not found`)

      return employee;
   }

    async createEmployee(createEmployeeDto: CreateEmployeeDto){
        const employee = await this.employeeModel.create(createEmployeeDto);
        employee.save();
        return employee;
   }

   async updateEmployeeInfo(id: string, updateEmployeeDto: UpdateEmployeeDto){
       const existingEmployee = await this.employeeModel
       .findByIdAndUpdate(new mongo.ObjectId(id), {$set: updateEmployeeDto}, {new: true}).exec();
       
      /// console.log(existingEmployee)

       if(!existingEmployee)
          throw new NotFoundException(`Employee with id number: ${id} not found`)

       return existingEmployee;
   }

   async softDeleteEmployee(id: string){
       let employee = await this.employeeModel.findOne({_id: id}).exec();
       if(!employee)
           throw new NotFoundException(`Employee with id number: ${id} not found`);
       if(employee.isActive === false)
           throw new GoneException(`Employee with id number: ${id} is already soft deleted`);
        employee.isActive = false;
       return this.updateEmployeeInfo(id, employee);        
   }

   async completleyDeleteEmployee(id: string){
       const employee = await this.findOneEmployee(id);
       return employee.remove();
   }

}
