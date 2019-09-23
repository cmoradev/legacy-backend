import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/local.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
    @UseGuards(LoginGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        res.status(201).json(req.user);
    }

    @Post('logout')
    public logout(@Req() req, @Res() res) {
        req.session.destroy(() => {
            res.json(true);
        });
    }
}
