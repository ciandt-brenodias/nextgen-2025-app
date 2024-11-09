import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '@app/core/core.module';
import { ComponentsModule } from '@app/shared/components/components.module';
import { MentoriasRoutingModule } from './mentorias-routing.module';
import { MentoriasComponent } from './mentorias.component';

@NgModule({
  declarations: [MentoriasComponent],
  imports: [
    CommonModule,
    CoreModule,
    MentoriasRoutingModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [MentoriasComponent],
})
export class MentoriasModule {}
