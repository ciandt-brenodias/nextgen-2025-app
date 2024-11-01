import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { MentoriasComponent } from './mentorias.component';
import { ComponentsModule } from '@app/shared/components/components.module';
import { MentoriasRoutingModule } from './mentorias-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

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
export class MentoriasModule { }
