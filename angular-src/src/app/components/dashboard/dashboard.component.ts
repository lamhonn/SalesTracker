import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  log: any;

  username: String;
  date: Date;
  hours: number;
  minutes: number;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  logHours(usname) {
    const log = {
      username: usname, // Username is passed from html component
      date: this.date,
      hours: this.hours*60 + this.minutes // Multiply hours with 60 and sum it with minutes
    }
    
    //Required fields
    if(!this.validateService.validateLog(log)) {
      this.flashMessage.show('Please fill in all fields properly', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    // New log  
    this.authService.newLog(log).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Logged workhours succesfully', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
