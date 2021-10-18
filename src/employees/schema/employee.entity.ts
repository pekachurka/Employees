import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Employee extends Document{
   
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;
    @Prop()
    email: string;
    @Prop()
    phoneNumber: string;
    @Prop()
    City: string;
    @Prop()
    Zip: string;
    @Prop()
    Adressline1: string;
    @Prop({required: false})
    Adressline2: string;
    @Prop()
    dateOfEmployment: string;
    @Prop()
    dateOfBirth: string;
    @Prop({required: false})
    isActive: boolean = true;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);