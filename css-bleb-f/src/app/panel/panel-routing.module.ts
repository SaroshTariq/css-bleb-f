import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { ProjectsComponent } from './body/projects/projects.component';
import { StudentsComponent } from './body/students/students.component';
import { PanelComponent } from './panel.component';
import { AccountComponent } from './body/account/account.component';
import { CategoriesComponent } from './body/categories/categories.component';
import { BeaconsComponent } from './body/beacons/beacons.component';


const routes: Routes = [ 
  {path: '', component: PanelComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
      {path: 'dashboard', component: DashboardComponent}, 
      {path: 'students', component: StudentsComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'beacons', component: BeaconsComponent},
      {path: 'account', component: AccountComponent}
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
