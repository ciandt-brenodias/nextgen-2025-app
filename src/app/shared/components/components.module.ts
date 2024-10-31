import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterCompoonent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

const COMPONENTS = [HeaderComponent, FooterCompoonent, TableComponent, SpinnerComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
