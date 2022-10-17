import { Get, Controller, Render, UseInterceptors} from '@nestjs/common';
import { TimerInterceptor } from "./timer/timer.interceptor";

@Controller()
export class AppController {
  signed_in = false;

  @Get('/')
  @Render('index.hbs')
  index() {
    return {
      signed_in: true
    };
  }

  @Get('portfolio')
  @Render('portfolio.hbs')
  @UseInterceptors(TimerInterceptor)
  portfolio() {
    return;
  }

  @Get('constructor')
  @Render('page_constructor.hbs')
  page_constr() {
    return;
  }

}
