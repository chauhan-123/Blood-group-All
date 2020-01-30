import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './layout/home/home.module';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:"full"},
  {path:'home' , loadChildren :'./layout/home/home.module#HomeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
