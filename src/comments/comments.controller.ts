import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  createComment(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(postId, createCommentDto);
  }

  @Get(':postId')
  findCommentsByPostId(@Param('postId') postId: string) {
    return this.commentsService.findCommentsByPostId(postId);
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentsService.deleteComment(commentId);
  }
}
