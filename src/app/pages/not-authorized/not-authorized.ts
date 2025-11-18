import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLink } from "../../components/button-link/button-link";

@Component({
  selector: 'app-not-authorized',
  imports: [RouterLink, ButtonLink],
  templateUrl: './not-authorized.html',
  styleUrl: './not-authorized.css',
})
export class NotAuthorizedPage {}

