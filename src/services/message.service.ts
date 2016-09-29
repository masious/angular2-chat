import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

import { LoginService } from './login.service';
import { UserService } from './user.service';
import { Message } from '../message';
import { Contact } from '../contact';


@Injectable()
export class MessageService implements OnInit{
	messages: Object = {};
	messageObservable: Observable<Message[]>;
	socket: any;

	constructor(
		private loginService: LoginService,
		private userService: UserService
	) {
		const io = require('socket.io-client');
		this.socket = io.connect('http://localhost:3000');

		let self = this;
		self.messageObservable = Observable.fromEvent<Message[]>(this.socket, 'message_delivered')
			.filter((data) => {return true});

		self.messageObservable.subscribe((message: any) => {
			self.addToMessages(message);
		});

		this.socket.on('connect', () => {
			console.log('connected. authenticating...');
			this.socket.emit('authenticate', this.loginService.getToken());
			this.socket.on('authenticated', () => {
				this.socket.emit('messages_requested');
			});
		});

		this.socket.on('diconnect', () => {
			console.log('disconnected');
		});
	}

	ngOnInit(): void {

	}

	sendMessage(message: Message): void {
		let sendingMessage = {
			sender: message.sender._id,
			receiver: message.receiver._id,
			content: message.content,
		};

		this.socket.emit('message_coming', sendingMessage);
	}

	getMessages(contact: Contact): Observable<Message> {
		let self = this;
		let myId = self.loginService.getUser()._id;
		return Observable.create((observer: Observer<Message>) => {
			self._getMessagesOf(contact).forEach((message: any) => {
				message = self._prepareMessage(message);
				console.log(message);
				observer.next(message);
			});

			self.messageObservable.subscribe((message: any) => {
				if(message.sender == contact._id || message.receiver == contact._id){
					message = self._prepareMessage(message);
					observer.next(message);
				}
			});
			
			return () => this.socket.close();
		});
	}

	addToMessages(message: any): void {
		let myId = this.loginService.getUser()._id;
		let contactId = (myId == message.sender) ? message.receiver : message.sender;

		if(!this.messages[contactId]){
			this.messages[contactId] = [];
		}
		if(message.sender instanceof Contact) {
			message.sender = message.sender._id;
		}
		if( message.receiver instanceof Contact) {
			message.receiver = message.receiver._id;
		}
		this.messages[contactId].push(message);
	}

	private _getMessagesOf(contact: Contact): Message[] {
		if(!this.messages[contact._id]){
			this.messages[contact._id] = [];
		}
		return this.messages[contact._id];
	}

	/*
		this function both returns and fixes the given message.
	*/
	private _prepareMessage(message: any): Message {
		if(typeof message.sender !== 'object') {
			message.sender = this.userService.getUser(message.sender);
		}
		if(typeof message.receiver !== 'object') {
			message.receiver = this.userService.getUser(message.receiver);
		}
		return message;
	}
}
