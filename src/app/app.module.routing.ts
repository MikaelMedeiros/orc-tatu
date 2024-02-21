import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { CalculadoraComponent } from "./pages/calculadora/calculadora.component";
import { HistoricComponent } from "./pages/historic/historic.component";
import { HomeComponent } from "./principal/home/home.component";
import { AuthenticationComponent } from "./principal/authentication/authentication.component";
import { authGuard } from "./guard/auth.guard";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {   path: '', component: CalculadoraComponent       },
            {   path: 'budgets', component: HistoricComponent   }
        ],
         //canActivate: [authGuard]
    },
    {

        path: '', component: AuthenticationComponent,
        children: [
            {   path: '', redirectTo: 'login', pathMatch: 'full' },
            {   path: 'login', component: LoginComponent }
        ]
    }

]

    @NgModule({
        declarations:[],
        imports: [CommonModule, RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })

    export class AppModuleRouting {}
