import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomePage } from './pages/home-page/home-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';
import { ReservationPage } from './pages/reservation-page/reservation-page';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { ListadoCajasComponent } from './pages/admin/cajero/listadocajas/listadocajas.component';
import { CajeroListComponent, CajeroPage } from './pages/admin/cajero/listado_cajero/cajero-page';
import { ListadoPagosPage } from './pages/admin/pago/listado-pagos-page/listado-pagos-page';
import { PagoPage } from './pages/admin/pago/pago-page/pago-page';
import { PagosPorSesionPage } from './pages/pagos-por-sesion-page/pagos-por-sesion-page';
import { ListadoConfirmacionesPage } from './pages/listado-confirmaciones-page/listado-confirmaciones-page';
import { isCashierGuard } from './guards/is-cashier-guard';
import { isLoggedInGuard } from './guards/is-logged-in-guard';
import { ViewReservations } from './pages/admin/reservacion/view-reservations/view-reservations';
import { ReservationDetails } from './pages/admin/reservacion/reservation-details/reservation-details';

const pagoBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const pagoId = route.paramMap.get('pagoId');
  return pagoId ? `Pago ${pagoId}` : 'Pago';
};

const cajeroBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const cajeroId = route.paramMap.get('cajeroId');
  return cajeroId ? `Cajero ${cajeroId}` : 'Cajero';
};

const reservationBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const reservationId = route.paramMap.get('reservacionId');
  return reservationId ? `Reservacion ${reservationId}` : 'Reservacion';
};

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
    data: { breadcrumb: 'Admin' },
    canActivateChild: [isCashierGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: AdminDashboard,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'cajero',
        component: CajeroPage,
        data: { breadcrumb: 'Cajeros' },
        children: [
          {
            path: '',
            component: CajeroListComponent,
          },
          {
            path: 'resumen/:cajeroId',
            component: ListadoCajasComponent,
            data: { breadcrumb: cajeroBreadcrumb },
          },
        ],
      },
      {
        path: 'pago',
        data: { breadcrumb: 'Pagos' },
        children: [
          {
            path: '',
            component: ListadoPagosPage,
          },
          {
            path: 'por-sesion',
            component: PagosPorSesionPage,
          },
          {
            path: 'confirmaciones',
            component: ListadoConfirmacionesPage,
          },
          {
            path: ':reservationId',
            component: PagoPage
            path: ':pagoId',
            component: PagoPage,
            data: { breadcrumb: pagoBreadcrumb },
          },
        ],
      },
      {
        path: 'ver-reservaciones',
        data: { breadcrumb: 'Reservaciones' },

        children: [
          {
            path: '',
            component: ViewReservations,
          },
          {
            path: ':reservacionId',
            component: ReservationDetails,
            data: { breadcrumb: reservationBreadcrumb },
          },
        ],
      },
    ],
  },
];
