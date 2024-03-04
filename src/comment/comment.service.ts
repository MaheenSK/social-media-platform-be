import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma : PrismaService){}

  createComment(postId: string, authorId: string, createCommentDto: CreateCommentDto) {
    const data={
      postId,
      authorId,
      ...createCommentDto
    }
    return this.prisma.comment.create({data})
  }

  async deleteComment(authorId: string, commentId: string){
    const comment = await this.prisma.comment.findFirst({
      where:{
        id: commentId
      }
    })
    if(comment.authorId !== authorId){
      throw new UnauthorizedException("You cannot delete this comment.")
    }
    return this.prisma.comment.delete({
      where:{id: commentId}
      })
  } 
}
