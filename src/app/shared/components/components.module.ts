import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FooterCompoonent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MentoriaProfessorDetailsComponent } from './mentoria-professor-details/mentoria-professor-details.component';
import { MentoriaStudentDetailsComponent } from './mentoria-student-details/mentoria-student-details.component';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableComponent } from './table/table.component';

const COMPONENTS = [
  HeaderComponent,
  FooterCompoonent,
  TableComponent,
  SpinnerComponent,
  ModalComponent,
  MentoriaProfessorDetailsComponent,
  MentoriaStudentDetailsComponent,
];

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatIconModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatExpansionModule,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MAT_MODULES],
  exports: [...COMPONENTS, ...MAT_MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
