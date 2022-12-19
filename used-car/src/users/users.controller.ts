import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { AuthGuard } from '../guards/authGuard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../auth/decorators/current-user-decorators';
import { UpdateDTO } from './dtos/update.dto';
import { UserDTO } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDTO)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/whoami')
  who(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    this.checkId(id);
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('')
  async findAllUsers(@Query('email') email: string) {
    return await this.userService.find(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateDTO) {
    this.checkId(id);
    return await this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    this.checkId(id);
    return await this.userService.remove(parseInt(id));
  }

  checkId(id: string) {
    if (!isNumberString(id)) {
      throw new BadRequestException('id must be a number');
    }
  }
}
