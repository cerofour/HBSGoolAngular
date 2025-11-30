import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth/auth';
import { ToastComponent } from './components/toast/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('HBSGoolFrontend');

  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.verifyLoggedIn();
    console.log('Tratando de recuperar información del perfil.');
  }

  handlePrimary = () => console.log('Primary clicked');
  handleSecondary = () => console.log('Secondary clicked');
  handleDanger = () => console.log('Danger clicked');
  handleNeutral = () => console.log('Neutral clicked');
}
