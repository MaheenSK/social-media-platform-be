import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  create(@Param('postId') postId: string, @Req() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(postId, req.user.userId, createCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param() id: string, @Req() req){
    return this.commentService.deleteComment(req.user.id, id)
  }
}
