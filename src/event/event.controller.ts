import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  ParseIntPipe,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventCreateDto } from './dto/event.create.dto';
import { EventService } from './event.service';
import { Event } from '@prisma/client';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @ApiOperation({
    summary: 'Get all Events',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Get('get_all')
  public async getAllEvents(): Promise<Event[]> {
    return this.eventService.events({});
  }

  @ApiOperation({
    summary: 'Get Event using Id',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Get('get/:id')
  public async getEventById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Event> {
    const eventIsExist = await this.eventService.event({ id: id });
    if (eventIsExist == null) {
      console.log('event not found');
      throw new HttpException('Event not found', HttpStatus.BAD_REQUEST);
    }
    return eventIsExist;
  }

  @ApiOperation({
    summary: 'Create Event',
  })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Post('create')
  public async addEvent(@Body() eventData: EventCreateDto): Promise<Event> {
    return this.eventService.createEvent(eventData);
  }

  @ApiOperation({
    summary: 'Delete Event using Id',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Delete('delete/:id')
  public async deleteEventById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Event> {
    const eventIsExist = await this.eventService.event({ id: id });
    if (eventIsExist == null) {
      console.log('event not found');
      throw new HttpException('Event not found', HttpStatus.BAD_REQUEST);
    }
    return this.eventService.deleteEvent({ id: id });
  }
}
