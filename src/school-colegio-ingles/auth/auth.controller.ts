import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { Response } from 'express';
import { RegisterGuard } from './guards/register.guard';

@Controller()
export class AuthController {
    @UseGuards(LoginGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
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
}
