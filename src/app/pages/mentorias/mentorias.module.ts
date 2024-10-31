import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { MentoriasComponent } from './mentorias.component';
import { ComponentsModule } from '@app/shared/components/components.module';
import { MentoriasRoutingModule } from './mentorias-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MentoriasComponent],
  imports: [
    CommonModule,
    CoreModule,
    MentoriasRoutingModule,
    ComponentsModule,
    MatProgressSpinnerModule,
  ],
  exports: [MentoriasComponent],
})
export class MentoriasModule {}
