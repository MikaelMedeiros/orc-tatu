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
import { TableModule } from 'primeng/table';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './pages/login/service/auth.service';
import { AppModuleRouting } from './app.module.routing';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HistoricComponent } from './pages/historic/historic.component';
import { HomeComponent } from './principal/home/home.component';
import { AuthenticationComponent } from './principal/authentication/authentication.component';
import { RouterOutlet } from '@angular/router';
import { LoggingInterceptor } from './interceptor/auth.interceptor';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ModalAgendamentoComponent } from './pages/historic/modal-agendamento/modal-agendamento.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { RemoveClassCheckboxDirective } from './diretivas/remove-class-checkbox.directive';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalculadoraComponent,
    HistoricComponent,
    HomeComponent,
    AuthenticationComponent,
    ModalAgendamentoComponent,
    RemoveClassCheckboxDirective,
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
    TableModule,
    AppModuleRouting,
    RouterOutlet,
    CarouselModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    AutoCompleteModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
