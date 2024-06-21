import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    // make a new post
    createPost(createPostDto: CreatePostDto): Post {
      const newPost: Post = {
        id: uuidv4(),
        userId: createPostDto.userId,
        title: createPostDto.title,
        content: createPostDto.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.posts.push(newPost);
      return newPost;
    }
    // find all posts of a user
    findPostsByUserId(userId: string): Post[] {
      return this.posts.filter(post => post.userId === userId);
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
}
