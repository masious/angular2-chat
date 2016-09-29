import { Contact } from './contact';

export class Message{
	sender: Contact;
	receiver: Contact;
	content: string;
	isSeen: boolean;
	date: Date;
}