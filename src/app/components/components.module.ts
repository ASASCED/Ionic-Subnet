import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PageinfoComponent } from './pageinfo/pageinfo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageinfoComponent
  ],
  exports: [
    PageinfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }