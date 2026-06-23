import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { TransferFunds } from './transfer-funds/transfer-funds';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'transfer-funds', component: TransferFunds }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
