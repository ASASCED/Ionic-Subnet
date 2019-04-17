import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PageinfoComponent } from './pageinfo/pageinfo.component';

@NgModule({
  declarations: [
    PageinfoComponent
  ],
  exports: [
    PageinfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }