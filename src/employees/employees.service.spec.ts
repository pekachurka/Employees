import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import {Employee} from './schema/employee.entity'
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

const employee = {
  _id: "616717f47123a68ff4dbcead",
  isActive: true,
  dateOfBirth: "11/02/1986",
  dateOfEmployment: "22/11/2013",
  Adressline1: "Kneza Milosa",
  Zip: "11070",
  City: "Belgrade",
  phoneNumber: "06946321",
  email: "sstefanovic@sadAf.com",
  lastname: "Stefanovic",
  firstname: "Stefan",
};

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
   
    const employeeModel = {
      save: jest.fn().mockResolvedValue(employee),
      find: jest.fn().mockResolvedValue([employee]),
      findOne: jest.fn().mockResolvedValue(employee),
      findOneAndUpdate: jest.fn().mockResolvedValue(employee),
      deleteOne: jest.fn().mockResolvedValue(true),
      exec: jest.fn().mockResolvedValue(employee),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,
      {provide: getModelToken(Employee.name), useValue: employeeModel,}
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      describe('findOneEmployee', () => {
          describe('when employee with the given ID exists', () =>{
              it('should return the employee object', async () => {
                      const employeeId = '616717f47123a68ff4dbcead';
                      const searchedEmployee = await service.findOneEmployee(employeeId);
                      expect(searchedEmployee).toEqual(employee);
              });
          });
          describe('otherwise', () =>{
              it('should throw not found exception ', async () => {
                      const employeeId = '1';
                      try {
                        await service.findOneEmployee(employeeId);
                      } catch (error) {
                          expect(error).toBeInstanceOf(NotFoundException);
                          expect(error.message).toEqual(`Employee with id number: ${employeeId} not found`)                     
                      }
              });
          });
      });

});