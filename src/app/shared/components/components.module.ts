import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterCompoonent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { MentoriaStudentDetailsComponent } from './mentoria-student-details/mentoria-student-details.component';
import { MentoriaProfessorDetailsComponent } from './mentoria-professor-details/mentoria-professor-details.component';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '@core/core.module';

const COMPONENTS = [HeaderComponent, FooterCompoonent, TableComponent, SpinnerComponent, MentoriaStudentDetailsComponent, MentoriaProfessorDetailsComponent];

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
export class ComponentsModule { }
