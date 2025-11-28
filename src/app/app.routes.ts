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
import { NotAuthorizedPage } from './pages/not-authorized/not-authorized';
import { NotFoundPage } from './pages/not-found/not-found';
import { ViewReservations } from './pages/admin/reservacion/view-reservations/view-reservations';
import { ReservationDetails } from './pages/admin/reservacion/reservation-details/reservation-details';

const pagoBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const pagoId = route.paramMap.get('pagoId');
  return pagoId ? `Pago ${pagoId}` : 'Pago';
};

const cajeroBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const cajeroId = route.paramMap.get('cajeroId');
  return cajeroId ? `Sesiones de Cajero ${cajeroId}` : 'Cajero';
};

const reservationBreadcrumb = (route: ActivatedRouteSnapshot): string => {
  const reservationId = route.paramMap.get('reservacionId');
  return reservationId ? `Reservacion ${reservationId}` : 'Reservacion';
};

import { ListadoReviews } from './pages/listado-reviews/listado-reviews';
import { ListadoUsers } from './pages/listado-users/listado-users';
import { Transacciones } from './pages/admin/cajero/transacciones/transacciones';
import { CerrarSesionCajeroComponent } from './pages/admin/cajero/cerrarsesioncajero/cerrarsesioncajero.component';
import { Breadcrumb } from '@syncfusion/ej2-navigations';
import { ReporteCierrePage } from './pages/reporte-cierre-page/reporte-cierre-page';

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
        data: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'reviews',
        component: ListadoReviews,
        data: { breadcrumb: 'Reviews' },
      },

      {
        path: 'users',
        component: ListadoUsers,
        data: { breadcrumb: 'Usuarios' },
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
          {
            path: 'transacciones/:sesionId',
            component: Transacciones,
            data: { breadcrumb: 'Transacciones' },
          },
          {
            path: 'cuadrar',
            component: CerrarSesionCajeroComponent,
            data: { breadcrumb: 'Cerrar Sesión de Cajero' },
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
            data: { breadcrumb: 'Pagos Por Sesión' },
          },
          {
            path: 'confirmaciones',
            component: ListadoConfirmacionesPage,
            data: { breadcrumb: 'Confirmaciones de Pago Remoto ' },
          },
          {
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
  {
    path: 'not-authorized',
    component: NotAuthorizedPage,
  },
  {
    path: 'not-found',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedPage,
  },
  {
    path: 'not-found',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
