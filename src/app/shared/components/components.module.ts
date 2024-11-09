import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from './spinner/spinner.component';
import { MentoriaStudentDetailsComponent } from './mentoria-student-details/mentoria-student-details.component';
import { MentoriaProfessorDetailsComponent } from './mentoria-professor-details/mentoria-professor-details.component';
import { TableComponent } from './table/table.component';
import { CoreModule } from '@core/core.module';
import { HeaderComponent } from './header/header.component';
import { FooterCompoonent } from './footer/footer.component';

const COMPONENTS = [HeaderComponent, FooterCompoonent, TableComponent, SpinnerComponent, MentoriaStudentDetailsComponent, MentoriaProfessorDetailsComponent];

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
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule, 
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatExpansionModule,
    CoreModule,
  ],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
