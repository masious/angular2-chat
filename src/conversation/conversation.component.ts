import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange } from '@angular/core';

import { MessageService } from '../services/message.service';
import { LoginService } from '../services/login.service';
import { Contact } from '../contact';
import { Message } from '../message';

@Component({
	selector: 'conversation',
	template: require('./conversation.component.html')
})
export class ConversationComponent implements OnInit, OnChanges {
	@ViewChild('messageHolder') private messagesHolder: ElementRef;
	@Input() contact: Contact;
	messages: Message[] = [];

	constructor(
		private messageService: MessageService,
		private loginService: LoginService
	){}

	ngOnInit(): void {
		if(this.contact) {
			this.listenToMessagesOf(this.contact);
		}
		this.scrollToBottom();
	}

	ngOnChanges(changes: {[property: string]: SimpleChange}): void {
		if(changes['contact'] && !changes['contact'].isFirstChange()) {
			// throw away previous conversation's messages.
			this.messages = []; 

			this.listenToMessagesOf(changes['contact'].currentValue);
		}
	}

	listenToMessagesOf(contact: Contact): void {
		let self = this;
		self.messageService.getMessages(self.contact).subscribe((message: Message) => {
			self.messageAdded(message);
		});
	}

	messageAdded(message: Message): void {
		this.messages.push(message);
		this.scrollToBottom();
	}

	scrollToBottom(): void {
		try {
			this.messagesHolder.nativeElement.scrollTop = this.messagesHolder.nativeElement.ScrollHeight;
		} catch(e) {
			//console.log(e);
		}
	}
}