import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SettingsService } from '../settings/settings.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/login.guard';

@Controller()
export class AuthController {
    constructor(readonly authService: AuthService,
                readonly settingsService: SettingsService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const company = await this.settingsService.fetchCompany();
        const jwt = await this.authService.generateJWT(req.user);
        res.status(201).send({
            user: req.user,
            accessJWT: jwt,
            company,
        });
    }

    @UseGuards(RegisterGuard)
    @Post('register')
    async register(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
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
}
