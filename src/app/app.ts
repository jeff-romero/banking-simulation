import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { Home } from './home/home';
import { Login } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    Navigation,
    Home,
    Login,
    ReactiveFormsModule,
    // ToastrModule.forRoot({
    //   timeOut:3000,
    //   positionClass:'toast-bottom-right',
    //   newestOnTop:false
    // })
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('banking-simulation');
}
