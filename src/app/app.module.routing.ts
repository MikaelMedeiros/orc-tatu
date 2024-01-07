import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CalculadoraComponent } from "./calculadora/calculadora.component";

const routes: Routes = [
    {path: '', component: CalculadoraComponent},    
    {path: 'login', component: LoginComponent},
]

@NgModule({
    declarations:[],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppModuleRouting {}
