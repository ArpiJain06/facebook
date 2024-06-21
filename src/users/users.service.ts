import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './update-user-profile.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users = [
    { 
        id: '1',
        username: 'johndoe',
        email: 'john@example.com', 
        bio: 'This is bio of john', 
        profilePicture: 'profile-pic-url-john' 
    },
    { 
        id: '2',
        username: 'mary',
        email: 'mary@example.com', 
        bio: 'This is bio of mary', 
        profilePicture: 'profile-pic-url-mary' 
    },
    { 
        id: '3',
        username: 'sandesh',
        email: 'sandesh@example.com', 
        bio: 'This is bio of sandesh', 
        profilePicture: 'profile-pic-url-sandesh' 
    },
];
    findUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }
    updateUserProfile(id: string, updateUserProfileDto: UpdateUserDto): string {
        const user = this.users.find(user => user.id === id);
        if (!user) {
        return `User with ID ${id} not found`;
        }
        if (updateUserProfileDto.bio) {
        user.bio = updateUserProfileDto.bio;
        }
        if (updateUserProfileDto.profilePicture) {
        user.profilePicture = updateUserProfileDto.profilePicture;
        }
        return `User with ID ${id} has been updated`;
    }
}
