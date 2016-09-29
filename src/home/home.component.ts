import { Component, ViewContainerRef } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { MessageService } from '../services/message.service';
import { Contact } from '../contact';
import { Message } from '../message';

@Component({
	selector: 'home',
	template: require('./home.component.html')
})
export class HomeComponent {
	user: Contact;

	constructor(private viewContainerRef: ViewContainerRef, private messageService: MessageService) {
	}

	userChanged(user: Contact) {
		this.user = user;
	}
}