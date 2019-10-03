import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(readonly authService: AuthService) {  }
    @UseGuards(LoginGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const jwt = await this.authService.generateJWT(req.user);
        res.status(201).json({
            user: req.user,
            accessJWT: jwt,
        });
    }

    @UseGuards(RegisterGuard)
    @Post('register')
    async register(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
    }

    @Post('logout')
    public logout(@Req() req, @Res() res) {
        req.session.destroy(() => {
            res.json(true);
        });
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('jwt')
    public getJWT(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
    }
}
