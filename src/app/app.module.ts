import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/service/auth.service';
import { AppModuleRouting } from './app.module.routing';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalculadoraComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    DragDropModule,
    InputTextareaModule,
    AccordionModule,
    DialogModule,
    SliderModule,
    AppModuleRouting,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
