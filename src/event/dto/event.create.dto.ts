import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EventCreateDto {
  @ApiProperty({
    example: 'Title for this event',
    description: 'Title for Event',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '22 may, 12:00',
    description: 'Date and time for Event',
  })
  @IsNotEmpty()
  readonly time: string;

  @ApiProperty({
    example: 'Some text for this event',
    description: 'Info about Event',
  })
  @IsNotEmpty()
  readonly content: string;
}
