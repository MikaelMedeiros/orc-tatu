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
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/service/auth.service';
import { AppModuleRouting } from './app.module.routing';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HistoricComponent } from './historic/historic.component';
import { HomeComponent } from './principal/home/home.component';
import { AuthenticationComponent } from './principal/authentication/authentication.component';
import { RouterOutlet } from '@angular/router';
import { LoggingInterceptor } from './account/auth.interceptor';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalculadoraComponent,
    HistoricComponent,
    HomeComponent,
    AuthenticationComponent
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
    CarouselModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
