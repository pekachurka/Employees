import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PagintaionQueryDto } from 'src/common/dto/pagintaion-query.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {

   constructor(private readonly employeesService: EmployeesService){}

   @Get('getall')
   getAllemployees(@Query() pagintaionQuery : PagintaionQueryDto){
      return this.employeesService.getAllEmployees(pagintaionQuery);
   }

   @ApiProperty({description: "returns all soft-deleted employees"})
   @Get('getdeleted')
   getAllDeletedemployees(@Query() pagintaionQuery : PagintaionQueryDto){
       return this.employeesService.getAllDeletedEmployees(pagintaionQuery);
   }

   @Get('getone/:id')
   findOneEmoloyee(@Param('id') id: string){
       return this.employeesService.findOneEmployee(id);
   }

  @Post('create')
     createEmployee(@Body() createEmployeeDto: CreateEmployeeDto){
  //   console.log(createEmployeeDto instanceof CreateEmployeeDto);
     return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Patch(':id')
   updateEmployeeInfo(@Param('id' )id: string, @Body() updateEmployeeDto: UpdateEmployeeDto){
       return this.employeesService.updateEmployeeInfo(id, updateEmployeeDto);
   }

   @Delete('soft/:id')
   softDeleteEmployee(@Param('id' )id: string){
       return this.employeesService.softDeleteEmployee(id);
   }

   @Delete('delete/:id')
   completleyDeleteEmployee(@Param('id' )id: string){
       return this.employeesService.completleyDeleteEmployee(id);
   }
}
