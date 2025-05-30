import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateValidationPipeDTO {
  @IsEmail()
  foo: string;

  @IsNotEmpty()
  baar: string;
}
