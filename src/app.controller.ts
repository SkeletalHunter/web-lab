import { Controller,
  Get,
  Render,
  Post,
  UseInterceptors,
  Req,
  Res} from '@nestjs/common';
import { TimerInterceptor } from './timer/timer.interceptor';
// import * as jsonwebtoken from 'jsonwebtoken';
// import { credential } from 'firebase-admin';
// import { FirebaseApp } from './auth/firebase-app';
// import firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebaseConfig from './auth/firebase-config';

@Controller()
export class AppController {
  signed_in = false;
  app: firebase.app.App;
  user_email: string;
  @Get('/')
  @Render('index.hbs')
  index() {
    return {
      signed_in: true,
    };
  }

  @Get('main_page')
  @Render('main_page.hbs')
  //@UseInterceptors(TimerInterceptor)
  main_page() {
    return;
  }

  @Get('grid_flex')
  @Render('grid_flex.hbs')
  grid_flex() {
    return;
  }

  @Get('to_do_list')
  @Render('to_do_list.hbs')
  to_do_list() {
    return;
  }

  @Get('6_and_7')
  @Render('6_and_7.hbs')
  @UseInterceptors(TimerInterceptor)
  page_6_and_7() {
    return;
  }
  @Post('auth/login')
  async login(@Req() req, @Res() res) {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password);
      const idToken = await user.user?.getIdToken();
      res.cookie('access_token', idToken);
      this.signed_in = true;
      this.user_email = req.body.email;
      return res.redirect('back');
    } catch (e) {
      console.log('Failed to sign in');
      return res.redirect('back');
    }
  }

  @Post('auth/register')
  async register(@Req() req, @Res() res) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password);
      return res.redirect('back');
    } catch (e) {
      console.log('Failed to register');
      return res.redirect('back');
    }
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    res.clearCookie('access_token');
    this.signed_in = false;
    return res.redirect('back');
  }
}
