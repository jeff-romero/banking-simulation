import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AccountService } from '../services/account-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
  attemptedLogin = false;
  @Input() loggedIn:boolean = false;
  returnUrl = '';

  // injections
  constructor(private formBuilder:FormBuilder, private accountService:AccountService, private activatedRoute: ActivatedRoute, private router:Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];

    if (this.loggedIn) {
      
    }
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

    console.log(`email: ${this.formControl['email'].value}`);
    console.log(`password: ${this.formControl['password']}`);

    this.accountService.logIn({ 
      email: this.formControl['email'].value,
      password: this.formControl['password']
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
