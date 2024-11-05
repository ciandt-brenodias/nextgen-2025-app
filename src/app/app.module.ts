import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MentoriasModule } from './pages/mentorias/mentorias.module';
import { ComponentsModule } from './shared/components/components.module';
import { mockDataInterceptor } from './shared/mock/mock.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ComponentsModule,
    MentoriasModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mockDataInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
