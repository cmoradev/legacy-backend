import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SettingsService } from '../settings/settings.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/login.guard';
import { AuthAccessTokensService } from '../auth-access-tokens/auth-access-tokens.service';
import * as moment from 'moment';
import { RefreshGuard } from './guards/refresh.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../common/docorators/public.decorator';

@Controller()
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly authAccessTokensService: AuthAccessTokensService,
    readonly settingsService: SettingsService,
    readonly jwtService: JwtService,
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const company = await this.settingsService.fetchCompany();
    const jwt = await this.authService.generateJWT(req.user);
    await this.authAccessTokensService.saveToken({
      expiresAt: moment(jwt.decode.exp * 1000).toDate(),
      name: 'Token',
      revoked: false,
      jwt: jwt.access_token,
      isActive: true,
      refresh: false,
      scopes: '[]',
      clientId: 1,
      userId: req.user.id,
    });

    res.status(200);
    res.send({
      user: req.user,
      accessJWT: {
        access_token: jwt.access_token,
      },
      company,
    });
  }

  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Req() req, @Res() res: Response) {
    res.status(200);
    res.send(req.user);
  }

  @Public()
  @Post('refresh-token')
  async refresToken(@Req() req, @Res() res) {
    try {
      const jwt = this.authService.renewToken(`${req.body.token}`);
      if (jwt?.access_token && jwt.decode?.username && jwt.decode?.sub) {
        res.status(201).json({
          refresh_token: `${jwt.access_token}`,
          decode: jwt?.decode,
        });
      } else {
        throw new UnauthorizedException('Not Found Token');
      }
    } catch (e) {
      throw new UnauthorizedException('Not Found Token');
    }
  }

  // @UseGuards(SessionGuard)
  @Get('logout')
  public logout(@Req() req, @Res() res) {
    res.send(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('jwt')
  public getJWT(@Req() req, @Res() res: Response) {
    res.status(201).json(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  public checkMySession(@Req() req, @Res() res: Response) {
    res.status(201).json(req.user);
  }

  @Public()
  @Post('forgot-password')
  public async forgotPassword(
    @Body(new ValidationPipe()) forgotPassword: ForgotPasswordDto,
  ): Promise<void> {
    await this.authService.forgotPassword(forgotPassword);
  }

  @Public()
  @Get('reset-password')
  public resetPassword(@Req() req, @Res() res: Response) {
    try {
      const token = this.jwtService.verify(req.query.key);
      res.status(200).send(token);
    } catch (e) {
      res.status(401).send({ data: { statusCode: 401, message: e.message } });
    }
  }
}
