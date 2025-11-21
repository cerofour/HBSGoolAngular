import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLink } from '../../components/button-link/button-link';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, ButtonLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFoundPage {}

