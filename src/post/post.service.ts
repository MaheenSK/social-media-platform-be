import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private prismaService: PrismaService){}

  create(userId: string, createPostDto: CreatePostDto) {
    const data = {
      authorId: userId,
      ...createPostDto
    } 
    return this.prismaService.post.create({data})
  }

  async getAllPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: {createdAt: 'desc'}
    });
    return posts;
  }

  async getUserPosts(userId: string) {
    const userPosts = await this.prismaService.post.findMany({
      where: {
        authorId: userId
      }
    });
    return userPosts
  }

  getPost(id: string) {
    return this.prismaService.post.findFirst({
      where:{
        id:id
      }
    })
  }

  async deletePost(postId: string, authorId: string){
    const post = await this.getPost(postId)
    if(post.authorId !== authorId){
      throw new UnauthorizedException('You cannot delete this post.')
    }
    return this.prismaService.post.delete({
      where:{
        id: postId
      }
    })
  }

  async updatePost(postId: string, authorId: string, updatePostDto: UpdatePostDto)
  {
    const post = await this.getPost(postId)
    if(post.authorId !== authorId){
      throw new UnauthorizedException('You cannot edit this post.')
    }
    return this.prismaService.post.update({
      where:{id: postId},
      data: updatePostDto
    })
  }
}
