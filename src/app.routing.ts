import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './services/logged-in.guard'

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
		canActivate: [LoggedInGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);