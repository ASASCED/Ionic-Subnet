import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IpsPage } from './ips.page';
import { PageinfoComponent } from '../components/pageinfo/pageinfo.component';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: IpsPage
  }
];

@NgModule({
  entryComponents: [
    PageinfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IpsPage]
})
export class IpsPageModule {}
