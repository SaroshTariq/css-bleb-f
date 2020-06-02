import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './body/dashboard/dashboard.component';
import { ProjectsComponent } from './body/projects/projects.component';
import { ProjectListComponent } from './body/projects/project-list/project-list.component';
import { ProjectModalComponent } from './body/projects/project-modal/project-modal.component';
import { StudentsComponent } from './body/students/students.component';
import { StudentListComponent } from './body/students/student-list/student-list.component';
import { StudentModalComponent } from './body/students/student-modal/student-modal.component';
import { SearchPipe } from '../pipes/search.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { ModalModule, BsDropdownModule, CarouselModule,  PopoverModule, AccordionModule, BsDatepickerModule, CollapseModule } from 'ngx-bootstrap';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AccountComponent } from './body/account/account.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { BeaconsComponent } from './body/beacons/beacons.component';
import { BeaconListComponent } from './body/beacons/beacon-list/beacon-list.component';
import { BeaconModalComponent } from './body/beacons/beacon-modal/beacon-modal.component';
import { CategoriesComponent } from './body/categories/categories.component';
import { CategoryListComponent } from './body/categories/category-list/category-list.component';
import { CategoryModalComponent } from './body/categories/category-modal/category-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CarouselModule,
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    PanelRoutingModule
  ],
  declarations: [
    DashboardComponent,
    PanelComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectModalComponent,
    StudentsComponent,
    StudentListComponent,
    StudentModalComponent,
    SearchPipe,
    FilterPipe,
    AccountComponent,
    ConfirmationModalComponent,
    BeaconsComponent,
    BeaconListComponent,
    BeaconModalComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryModalComponent
  ],
  entryComponents: [ ProjectModalComponent, StudentModalComponent, CategoryModalComponent, BeaconModalComponent, ConfirmationModalComponent ]
})
export class PanelModule { }
