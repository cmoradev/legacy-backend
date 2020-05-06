import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SettingsService } from '../settings/settings.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/login.guard';
import { AuthAccessTokensService } from '../auth-access-tokens/auth-access-tokens.service';
import * as moment from 'moment';

@Controller()
export class AuthController {
    constructor(readonly authService: AuthService,
                readonly authAccessTokensService: AuthAccessTokensService,
                readonly settingsService: SettingsService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const company = await this.settingsService.fetchCompany();
        const jwt = await this.authService.generateJWT(req.user);
        this.authAccessTokensService.saveToken({
            expiresAt: moment(jwt.decode.exp * 1000).toDate(),
            name: 'Token',
            revoked: false,
            refresh: false,
            scopes: '[]',
            clientId: 1,
            userId: req.user.id,
        });

        res.status(201).send({
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
