import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../contact';
import { Constants } from '../constants';

@Injectable()
export class UserService {

	private users: Object = {};
	private usersUrl = 'users';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http){}

	addUser(contact: Contact): Promise<Contact> {
		let url = `${Constants.baseUrl}${this.usersUrl}/add`;
		return this.http.post(url, JSON.stringify(contact), {headers: this.headers})
		.toPromise().then(() => contact);
	}

	getUsers(): Promise<Contact[]> {
		var self = this;
		let url = `${Constants.baseUrl}${self.usersUrl}/`;
		return self.http.get(url).toPromise()
			.then((response: any) => response.json() as Contact[])
			.then((contacts: Contact[]) => {
				contacts.forEach((user) => {
					self.users[user._id] = user;
				});
				return contacts;
			});
	}

	getUser(id: string): Contact {
		return this.users[id];
	}
}
