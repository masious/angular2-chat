import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LoginService } from '../services/login.service';
import { MessageService } from '../services/message.service';
import { Contact } from '../contact';
import { Message } from '../message';

@Component({
	selector: 'message-composer',
	template: require('./message-composer.component.html')
})
export class MessageComposerComponent{
	content: string;
	@Input() contact: Contact;
	@Output() messageAdded: EventEmitter<Message> = new EventEmitter<Message>();

	constructor(
		private loginService: LoginService,
		private messageService: MessageService
	){}

	checkSend(event: any): void {
		if(event.keyCode == 13){
			console.log('sending', this.content);
			let message = {
				content: this.content,
				sender: this.loginService.getUser(),
				receiver: this.contact,
				isSeen: false,
				date: new Date()
			};
			
			this.messageService.sendMessage(message);
			this.content = '';
		}
	}
}