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
import { ModalComponent } from './modal/modal.component';
import { MentoriaDetailsComponent } from './mentoria-details/mentoria-details.component';

const COMPONENTS = [HeaderComponent, FooterCompoonent, TableComponent, SpinnerComponent, ModalComponent, MentoriaDetailsComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatExpansionModule,
  ],
  exports: [...COMPONENTS],
})
export class ComponentsModule { }
