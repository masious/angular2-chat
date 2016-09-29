import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Contact } from '../contact.ts';
import { UserService } from '../services/user.service';

@Component({
	selector: 'chats',
	template: require('./chats.template.html')
})
export class ChatsComponent implements OnInit {

	users: Contact[];

	contact: Contact;

	@Output()
	userChange: EventEmitter<Contact> = new EventEmitter<Contact>();

	constructor(private userService: UserService){}

	selectContact(contact: Contact): void {
		this.contact = contact;
		this.userChange.emit(contact);
	}

	ngOnInit(): void {
		this.userService.getUsers().then((users) => {
			this.users = users;
		});
	}
}