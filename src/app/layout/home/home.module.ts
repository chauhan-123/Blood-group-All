import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from '@angular/router';
import { HomeComponent } from './home.component';
import { MatButtonModule,  MatRadioModule, MatOptionModule, MatSelectModule, MatTableModule, MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const home:Routes=[
  {path:'' , component:HomeComponent}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(home),
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    FormsModule,
    
    
    
  ]
})
export class HomeModule { }
