import { Controller, Get, Post, Delete, Body, ParseIntPipe, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from "./dto/user.create.dto";
import { UserService } from "./user.service";
import { User } from "@prisma/client";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({
        summary: 'Get User by Id'
    })
    @ApiResponse({
        status: 200,
        description: 'OK'
    })
    @ApiResponse({
        status: 403,
        description: 'Access denied'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request: User not found'
    })
    @Get(':id/get')
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const userIsExist = await this.userService.user({id: id});
        if (userIsExist == null) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 
        return userIsExist;
    }

    @ApiOperation({
        summary: 'Get all Users'
    })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @Post('get_all')
    public async getAllUser(): Promise<User[]> {
        return this.userService.users({});
    }

    @ApiOperation({
        summary: 'Create User'
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully created'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @Post('create')
    public async addUser(@Body() userData: UserCreateDto): Promise<User> {
        return this.userService.createUser(userData);
    }

    @ApiOperation({
        summary: 'Delete User using Id'
    })
    @ApiResponse({
        status: 200,
        description: 'User has been successfully deleted'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request: User not found'
    })
    @Delete('delete/:id')
    public async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const userIsExist = await this.userService.user({id: id});
        if (userIsExist == null) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 
        return this.userService.deleteUser({id:id});
    }
}
