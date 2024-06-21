import { Controller, Post, Get, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // creating new post
  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostEntity {
    return this.postsService.createPost(createPostDto);
  }
  // viewing all posts of a certain user
  @Get('user/:userId')
  findPostsByUserId(@Param('userId') userId: string): PostEntity[] {
    return this.postsService.findPostsByUserId(userId);
  }
  //edit a post
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): PostEntity {
    const updatedPost = this.postsService.updatePost(id, updatePostDto);
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updatedPost;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): { message: string } {
    const result = this.postsService.deletePost(id);
    if (!result) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: 'Post deleted successfully' };
  }
  
}
