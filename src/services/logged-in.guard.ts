import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from './login.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(private loginService: LoginService){

	}
	canActivate() {
		return this.loginService.isLoggedIn();
	}
}