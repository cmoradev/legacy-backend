import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionGuard } from './guards/session.guard';
import { SettingsService } from '../settings/settings.service';

@Controller()
export class AuthController {
    constructor(readonly authService: AuthService,
                readonly settingsService: SettingsService) {
    }

    @UseGuards(LoginGuard)
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
        req.session.destroy(() => {
            res.status(HttpStatus.OK).send({ status: true, message: 'Se ha cerrado sesión exitosamente' });
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('jwt')
    public getJWT(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
    }

    @UseGuards(SessionGuard)
    @Post('me')
    public checkMySession(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
    }
}
