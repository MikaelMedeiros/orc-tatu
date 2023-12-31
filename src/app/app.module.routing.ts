import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CalculadoraComponent } from "./calculadora/calculadora.component";
import { HistoricComponent } from "./historic/historic.component";

const routes: Routes = [
    {path: '', component: CalculadoraComponent},    
    {path: 'login', component: LoginComponent},
    {path: 'historic', component: HistoricComponent},
]

@NgModule({
    declarations:[],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppModuleRouting {}
