import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { MyInput } from '../../components/input/input';
import { Button } from "../../components/button/button";
import { AuthService } from '../../services/auth/auth';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MyInput, Button, Modal],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {

  authService = inject(AuthService);
  router = inject(Router);

  @ViewChild('modal') modal!: Modal;

  signupForm = new FormGroup({
    nombre: new FormControl(''),
    apellidoPaterno: new FormControl(''),
    apellidoMaterno: new FormControl(''),
    dni: new FormControl('',  [
      Validators.required,
      Validators.pattern(/^[0-9]{8}$/)
    ]),
    celular: new FormControl('', [
      Validators.required,
      Validators.pattern(/^9\d{8}$/)]),
    email: new FormControl(''),
    contrasena: new FormControl(''),
  });

  onSubmit(event: Event) {
    event.preventDefault();

    const data = this.signupForm.value;

    this.authService.register(data).subscribe({
      next: _ => {
        this.router.navigate(['/login']);
      },
      error: _ => {
        this.modal?.open();
      }
    });
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
