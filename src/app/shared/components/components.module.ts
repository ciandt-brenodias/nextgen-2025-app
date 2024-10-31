import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterCompoonent } from './footer/footer.component';

const COMPONENTS = [HeaderComponent, FooterCompoonent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
