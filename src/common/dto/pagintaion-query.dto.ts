
import { IsOptional, IsPositive } from "class-validator";


export class PagintaionQueryDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;

}
