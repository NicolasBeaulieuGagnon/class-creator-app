import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { GetLectureFilterDto } from './dto/getLectureDto';
import { LectureService } from './lecture.service';

@Controller('lectures')
@UseGuards(AuthGuard())
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Post()
  createLecture(
    @Body() createLectureDto: CreateLectureDto,
    @GetUser() user: User,
  ) {
    return this.lectureService.createLecture(createLectureDto, user);
  }

  @Post('/:id/')
  joinLecture(@Param() id: string, @GetUser() user: User): Promise<void> {
    return this.lectureService.joinLecture(id, user);
  }

  @Get()
  getLectures(
    @Query() lectureFilterDto: GetLectureFilterDto,
    @GetUser() user: User,
  ) {
    return this.lectureService.getLectures(lectureFilterDto, user);
  }

  @Get('/:id')
  getLectureById(@Param('id') id: string) {
    return this.lectureService.getLectureById(id);
  }

  @Delete('/:id')
  leaveLecture(@Param('id') id: string, @GetUser() user: User) {
    return this.lectureService.leaveLecture(id, user);
  }
}
