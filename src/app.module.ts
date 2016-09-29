import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChatsComponent} from './chats/chats.component';
import { ConversationComponent } from './conversation/conversation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComposerComponent } from './message-composer/message-composer.component';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { LoggedInGuard } from './services/logged-in.guard';


import './styles.css'

@NgModule({
	imports: [
		NgbModule,
		BrowserModule,
		HttpModule,
		FormsModule,
		routing
	],
	declarations: [
		NavbarComponent,
		ConversationComponent,
		HomeComponent,
		ChatsComponent,
		LoginComponent,
		MessageComposerComponent,
		AppComponent
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		LoginService,
		MessageService,
		UserService,
		LoggedInGuard
	]
})
export class AppModule{

}