import { Controller, Query, Post, Get, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
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
  @Get('userId')
  findPostsByUserId(@Query('q') userId: string): PostEntity[] {
    return this.postsService.findPostsByUserId(userId);
  }
  //edit a post
  @Patch(':postId')
  updatePost(@Param('postId') id: string, @Body() updatedPostDto: UpdatePostDto): PostEntity {
    const updatedPost = this.postsService.updatePost(id, updatedPostDto);
    if (!updatedPost) {
      throw new NotFoundException(`Post not found`);
    }
    return updatedPost;
  }
  //delete a post
  @Delete(':postId')
  deletePost(@Param('postId') id: string): { message: string } {
    const result = this.postsService.deletePost(id);
    if (!result) {
      throw new NotFoundException(`Post not found`);
    }
    return { message: 'Post deleted successfully' };
  }
  // all posts
  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }
  // like a post
  @Patch('like/:postId/:userId')
  likePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.likePost(postId, userId);
  }
  //removing the like
  @Patch('unlike/:postId/:userId')
  unlikePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.unlikePost(postId, userId);
  }
}
