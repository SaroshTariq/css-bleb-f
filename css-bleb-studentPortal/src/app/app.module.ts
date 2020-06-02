import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule, TabsModule, PopoverModule, BsDatepickerModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CongratsComponent } from './congrats/congrats.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { StudentComponent } from './panel/student/student.component';
import { ProjectComponent } from './panel/project/project.component';
import { DatePipe } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CongratsComponent,
    LoginComponent,
    PanelComponent,
    StudentComponent,
    ProjectComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    HttpModule,
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
