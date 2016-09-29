import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Contact } from '../contact';
import { Constants } from '../constants';

@Injectable()
export class LoginService {
	private loggedIn = false;
	private user: Contact;

	constructor(private http: Http){
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	login(phoneNumber: string, password: string) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${Constants.baseUrl}users/login`;

		return this.http
			.post(url, JSON.stringify({phoneNumber, password}), {headers})
			.map(res => res.json())
			.map((res) => {
				if(res.success) {
					localStorage.setItem('auth_token', res.token);
					localStorage.setItem('user', JSON.stringify(res.user));
					this.loggedIn = true;
				}

				return res.success;
			});
	}

	logout(): void {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	isLoggedIn(): boolean {
		return this.loggedIn;
	}

	getName(): any {
		return this.getUser().name;
	}

	getToken(): string {
		return localStorage.getItem('auth_token');
	}

	getUser(): Contact {
		if(this.user) {
			return this.user;
		} else {
			return this.user = JSON.parse(localStorage.getItem('user'));
		}
	}
}