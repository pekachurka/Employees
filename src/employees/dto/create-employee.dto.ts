
import { ApiProperty } from "@nestjs/swagger";
import { isString, isNumber, IsNumber, IsString, isDate, IsDate, IsBoolean, IsOptional } from "class-validator";

export class CreateEmployeeDto {

    @IsString()  
    readonly firstname: string;
    @IsString() 
    readonly lastname: string;
    @IsString()   
    readonly email: string;
    @IsString() 
    readonly phoneNumber: string;
    @IsString() 
    readonly City: string;
    @IsString() 
    readonly Zip: string;
    @IsString() 
    readonly Adressline1: string;
    @IsOptional()
    readonly Adressline2: string;
    @IsString()   
    readonly dateOfEmployment: string;
    @IsString()
    readonly dateOfBirth: string;
    @ApiProperty({description: 'false - employee is soft deleted from the database'})
    @IsOptional()
    readonly isActive: boolean = true;
}
