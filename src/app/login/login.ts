import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AccountService } from '../services/account-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Account } from '../shared/models/account';
import { TextInput } from '../partials/text-input/text-input';
import { InputContainer } from '../partials/input-container/input-container';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TextInput, InputContainer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
  attemptedLogin = false;
  @Input() loggedIn:boolean = false;
  returnUrl = '';
  account!: Account;
  EMAIL = 'Email';
  PASSWORD = 'Password';
  emailPlaceholder = 'Email';
  passwordPlaceholder = 'Password';

  // injections
  constructor(private formBuilder:FormBuilder, private accountService:AccountService, private activatedRoute: ActivatedRoute, private router:Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('Account')) {
      this.router.navigateByUrl('/');
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  get formControl() {
    return this.loginForm.controls;
  }

  logIn(): void {
    this.attemptedLogin = true;

    if (this.loginForm.invalid) {
      return;
    }

    let toHash:any = this.formControl['password'];
    let hash:any = CryptoJS.SHA256(toHash).toString();
    this.formControl['password'] = hash;

    // console.log(`email: ${this.formControl['email'].value}`);
    // console.log(`password: ${this.formControl['password']}`);

    this.accountService.logIn({ 
      email: this.formControl['email'].value,
      password: this.formControl['password']
    }).subscribe(() => {
      // yes, it is necessary to repeat navigateByUrl twice
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 0);
      this.router.navigateByUrl('/');
    });
  }
}
