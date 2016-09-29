import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { Contact } from '../contact';

@Component({
	selector: 'login',
	template: require('./login.component.html')
})
export class LoginComponent{

	constructor(
		private loginService: LoginService,
		private router: Router
	){}

	checkLogin(phoneNumber: string, password: string): void {
		this.loginService.login(phoneNumber, password).subscribe((result: any) => {
			if(result) {
				this.router.navigate(['']);
			}
		});
	}
}
