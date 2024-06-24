import { Injectable } from '@nestjs/common';
import { Comment } from './comments.entity';
import { CreateCommentDto} from './comments.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
    private comments: { [postId: string]: Comment[] } = {};
    //making a new comment
    createComment(postId: string, createCommentDto: CreateCommentDto): Comment {
      const newComment: Comment = {
        id: uuidv4(),
        postId: createCommentDto.postId,
        userId: createCommentDto.userId,
        content: createCommentDto.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      if (!this.comments[postId]) {
        this.comments[postId] = [];
      }
      this.comments[postId].push(newComment);
        return newComment;
    }
    //finding all comments of a post
    findCommentsByPostId(postId: string): Comment[] {
      return this.comments[postId] || [];
    }
    //deleting a comment
    deleteComment(commentId: string): boolean {
      for (const postId in this.comments) {
        const index = this.comments[postId].findIndex(comment => comment.id === commentId);
        if (index !== -1) {
            this.comments[postId].splice(index, 1);
            return true;
        }
      }
      return false;
    }
}
