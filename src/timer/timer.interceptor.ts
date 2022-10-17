import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ time: string }> {
    const now = Date.now();

    return next
      .handle()
      .pipe(map(() => ({ time: ` + ${Date.now() - now} ms (сервер)` })));
  }
}
