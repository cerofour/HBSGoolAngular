import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-pago-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './pago-page.html',
  styleUrl: './pago-page.css',
})
export class PagoPage {

}
