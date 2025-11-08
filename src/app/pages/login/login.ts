import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { MyInput } from '../../components/input/input';
import { Button } from "../../components/button/button";
import { AuthService } from '../../services/auth';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MyInput, Button, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);

  @ViewChild('modal') modal!: Modal;

  loginFormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit(event: Event) {

    event.preventDefault();

    this.authService.login(this.loginFormGroup.value.email ?? '', this.loginFormGroup.value.password ?? '')
      .subscribe({
        next: _ => {
          this.router.navigate(["/"])
        },
        error: _ => {
          this.modal?.open();
        }
      })
  }

  onSignupClick() {
    this.router.navigate(["/signup"]);
  }
}
