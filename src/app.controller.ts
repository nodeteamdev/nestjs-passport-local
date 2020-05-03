// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  Body,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private userService: UsersService) {}

  @Get('/')
  @Render('login')
  index(@Request() req, @Res() res: Response): {message: string} {
    return { message: req.flash('loginError') };
  }

  @Get('/sign-in')
  @Render('signin')
  async signin(@Request() req, @Res() res: Response): Promise<void> {
    return;
  }

  @Post('/create')
  @Render('create')
  async create(@Body() params: CreateUserDto, @Request() req, @Res() res: Response): Promise<void> {
    await this.userService.create(params);

    return res.redirect('/');
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Request() req, @Res() res: Response): void {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req, @Res() res: Response): {user: any } {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req: any, @Res() res: Response): {user: any} {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }
}
