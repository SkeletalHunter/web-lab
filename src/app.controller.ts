import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { TimerInterceptor } from './timer/timer.interceptor';

@Controller()
export class AppController {
  signed_in = false;

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
}
