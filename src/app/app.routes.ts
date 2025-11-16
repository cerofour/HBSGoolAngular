import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomePage } from './pages/home-page/home-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';
import { ReservationPage } from './pages/reservation-page/reservation-page';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ListadoCajasComponent } from './pages/listadocajas/listadocajas.component';
import { CajeroListComponent, CajeroPage } from './pages/cajero/cajero-page';
import { ListadoPagosPage } from './pages/listado-pagos-page/listado-pagos-page';
import { PagoPage } from './pages/pago-page/pago-page';
import { isCashierGuard } from './guards/is-cashier-guard';
import { isLoggedInGuard } from './guards/is-logged-in-guard';
import { ViewReservations } from './pages/view-reservations/view-reservations';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: SignUpPage,
  },
  {
    path: 'reservar/:canchaId',
    component: ReservationPage,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'admin',
    canActivateChild: [isCashierGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
      },
      {
        path: 'cajero',
        component: CajeroPage,
        children: [
          {
            path: '',
            component: CajeroListComponent,
          },
          {
            path: 'resumen/:cajeroId',
            component: ListadoCajasComponent,
          },
        ],
      },
      {
        path: 'pago',
        children: [
          {
            path: '',
            component: ListadoPagosPage,
          },
          {
            path: ':pagoId',
            component: PagoPage
          },
        ],
      },
      {
        path: 'ver-reservaciones',
        component: ViewReservations
      },
    ],
  },
];
