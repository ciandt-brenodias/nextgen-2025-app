import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { ComponentsModule } from '@app/shared/components/components.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    CoreModule,
    PerfilRoutingModule,
    ComponentsModule,
    MatTabsModule
  ],
  exports: [PerfilComponent],
})
export class PerfilModule { }
