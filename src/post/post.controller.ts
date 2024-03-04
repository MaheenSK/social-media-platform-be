import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, BadRequestException, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Public } from 'src/auth/decorators/SkipAuth.decorator';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file,
    @Body() createPostDto: CreatePostDto,
    @Req() req) {
    if(file){
      const uploadedFile = await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
      const post = {
        image: uploadedFile.url,
        ...createPostDto
      }
      return this.postService.create(req.user.userId , post);
    }
    return this.postService.create(req.user.userId , createPostDto);
  }

  @Public()
  @Get('all')
  findAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get()
  findUserPosts(@Req() req) {
    return this.postService.getUserPosts(req.user.userId);
  }

  @Public()
  @Get(':id')
  findPost(@Param('id') id:string) {
    return this.postService.getPost(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id:string, @Req() req) {
    return this.postService.deletePost(id, req.user.userId);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updatePost(
    @UploadedFile() file,
    @Param('id') id:string,
    @Req() req,
    @Body() updatePostDto: UpdatePostDto){
    if(file){
      const uploadedFile = await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
      const updatedPost = {
        image: uploadedFile.url,
        ...updatePostDto
      }
      return this.postService.updatePost(id, req.user.userId, updatedPost)
  }
  return this.postService.updatePost(id, req.user.userId, updatePostDto)

}}
