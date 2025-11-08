import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomePage } from './pages/home-page/home-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';
import { ReservationPage } from './pages/reservation-page/reservation-page';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
	{
		path: '',
		component: HomePage
	},
	{
		path: 'login',
		component: Login
	},
	{
		path: 'signup',
		component: SignUpPage 
	},
	{
		path: 'reservar/:canchaId',
		component: ReservationPage 
	},
	{
		path: 'admin-dashboard',
		component: AdminDashboard
	}
];
