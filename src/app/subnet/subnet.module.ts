import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubnetPage } from './subnet.page';
import { IpsPipe } from '../pipes/all-pipes.pipe';


const routes: Routes = [
  {
    path: '',
    component: SubnetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubnetPage, IpsPipe]
})
export class SubnetPageModule {}
