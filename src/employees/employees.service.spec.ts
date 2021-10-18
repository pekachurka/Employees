import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Repository } from 'typeorm';
import { EmployeesService } from './employees.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Employee} from './schema/employee.entity'
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
   findOne: jest.fn(),
   create: jest.fn()
});

describe('EmployeesService', () => {
  let service: EmployeesService;
  let employeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,
      {provide: Connection, useValue: {}},
      {provide: getRepositoryToken(Employee), useValue: {createMockRepository}},
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    employeeRepository = module.get<MockRepository>(getRepositoryToken(Employee));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('findOneEmployee', () => {
      describe('when employee with the given id exists', () =>{
           it('should return employee object', async () => {
               const employeeId = '1';
               const expectedEmployee = {};

               employeeRepository.findOne.mockReturnValue(expectedEmployee);
               const employee = await service.findOneEmployee(employeeId);
               expect(employee).toEqual(expectedEmployee);
           });
      });    
      describe('otherwise', () =>{
        it('should throw not found exception', async () => {
            const employeeId = '1';
            employeeRepository.findOne.mockReturnValue(undefined);
          
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