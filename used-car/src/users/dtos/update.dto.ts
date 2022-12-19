import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
