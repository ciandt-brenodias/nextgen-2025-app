import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpsRequestInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
