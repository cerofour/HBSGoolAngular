import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/button/button';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HBSGoolFrontend');

  handlePrimary = () => console.log('Primary clicked');
  handleSecondary = () => console.log('Secondary clicked');
  handleDanger = () => console.log('Danger clicked');
  handleNeutral = () => console.log('Neutral clicked');
}
