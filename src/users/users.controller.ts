import { Controller, Get, Patch, Param, Body, NotFoundException  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user-profile.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get(':id/profile')
    getUserProfile(@Param('id') id: string): User {
        const user = this.usersService.findUserById(id);
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    @Patch(':id/profile')
    updateUserProfile(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserDto,): string {
        const updatedUser = this.usersService.updateUserProfile(id, updateUserProfileDto);
        if (!updatedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
        }
}
