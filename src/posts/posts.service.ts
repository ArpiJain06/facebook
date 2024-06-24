import { Injectable, NotFoundException, Logger  } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private readonly logger = new Logger(PostsService.name);

    // make a new post
    createPost(createPostDto: CreatePostDto): Post {
      const newPost: Post = {
        id: uuidv4(),
        userId: createPostDto.userId,
        title: createPostDto.title,
        content: createPostDto.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes:[],
      };
      this.posts.push(newPost);
      return newPost;
    }
    // find all posts of a user
    findPostsByUserId(userId: string): Post[] {
      this.logger.log(`Finding posts for userId: ${userId}`);
    
    const filteredPosts = this.posts.filter(post => post.userId === userId);

    this.logger.log(`Found ${filteredPosts.length} posts`);

    return filteredPosts;
      // return this.posts.filter(post => post.userId === userId);
    }
    // find a post by it's id in order to edit it
    findPostById(postId: string): Post | undefined {
      return this.posts.find(post => post.id === postId);
    }
    // and update the post
    updatePost(postId: string, updatePostDto: UpdatePostDto): Post | undefined {
      const post = this.findPostById(postId);
      if (!post) {
        return undefined;
      }
      if (updatePostDto.userId) {
        post.userId = updatePostDto.userId;
      }
      if (updatePostDto.title) {
        post.title = updatePostDto.title;
      }
      if (updatePostDto.content) {
        post.content = updatePostDto.content;
      }
      post.updatedAt = new Date();
      return post;
    }
  
    deletePost(postId: string): boolean {
      const index = this.posts.findIndex(post => post.id === postId);
      if (index === -1) {
        return false;
      }
      //removes one element from posts array at the specified index
      this.posts.splice(index, 1);
      return true;
    }
    //method to find all posts
    findAllPosts(): Post[] {
      return this.posts;
    }
    // Method to like a post
    likePost(postId: string, userId: string): Post {
      const post = this.posts.find(post => post.id === postId);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        post.updatedAt = new Date();
      }
      return post;
    }
    // Method to unlike a post
    unlikePost(postId: string, userId: string): Post {
      const post = this.posts.find(post => post.id === postId);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      const index = post.likes.indexOf(userId);
      if (index !== -1) {
        post.likes.splice(index, 1);
        post.updatedAt = new Date();
      }
      return post;
    }
}
