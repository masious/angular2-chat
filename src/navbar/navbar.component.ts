import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Contact } from '../contact';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';


@Component({
	selector: 'navbar',
	templateUrl: 'src/navbar/navbar.component.html'
})
export class NavbarComponent implements OnInit{

	name: string;

	constructor(
		private modalService: NgbModal, 
		private userService: UserService,
		private router: Router,
		private loginService: LoginService
	){}

	showChildModal(content: string): void {
		this.modalService.open(content);
	}

	addUser(name: string, phoneNumber: string) {
		let contact: Contact = {
			_id: '-1',
			name,
			phoneNumber
		};
		this.userService.addUser(contact);
	}

	logout(): void {
		this.loginService.logout();
		this.router.navigate(['login']);
	}

	ngOnInit(): void {
		this.name = this.loginService.getName();
	}
}
