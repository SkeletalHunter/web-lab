import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    example: 'itmo2000@mail.ru',
    description: 'email of User'
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Mihail',
    description: 'Name of User'
  })
  public name: string;
}