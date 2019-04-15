import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ips', pathMatch: 'full' },
  { path: 'ips', loadChildren: './ips/ips.module#IpsPageModule' },
  { path: 'subnet', loadChildren: './subnet/subnet.module#SubnetPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
