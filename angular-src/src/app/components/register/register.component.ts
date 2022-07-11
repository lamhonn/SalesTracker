import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private ValidateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.name,
      email: this.email,
      password: this.password
    }
    
    // Required fields
    if(!this.ValidateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }
    
    // Validate email
    if(!this.ValidateService.validateEmail(user)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }
  }
}
