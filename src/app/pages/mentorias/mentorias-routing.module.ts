import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentoriasComponent } from './mentorias.component';

const routes: Routes = [
  { path: '', component: MentoriasComponent },
  { path: 'mentorias', component: MentoriasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentoriasRoutingModule {}
