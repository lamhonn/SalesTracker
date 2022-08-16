import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    // default dates - ongoing week's Monday and Sunday
    // reference: https://bobbyhadz.com/blog/javascript-get-monday-of-current-week
    const today = new Date(); // get today date
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;

    const defaultEndDate = new Date(today.setDate(last)).toISOString().split("T")[0]; // Sunday of current week
    const defaultStartDate = new Date(today.setDate(first)).toISOString().split("T")[0]; // Monday of current week

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getLogs(profile.user.username, defaultStartDate, defaultEndDate);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getLogs(username, startDate, endDate) {
    // https://www.youtube.com/watch?v=NcBW26vh_3A
    this.authService.getLog(username).subscribe(workhour => {
      // Put entries into array 'log' with a for-loop
      // Probably not the most efficient way of doing this, 
      // but it is something came up with quickly
      this.log = []; // empty array at the start of the function
      var j = 0;
      for (var i = 0; i < workhour.length; i++) {
        const tempDate = workhour[i].date.split("T")[0];
          if (tempDate >= startDate && tempDate <= endDate) {
            var tempHour;
            var tempMinutes;
            
            if (workhour[i].hours % 60 === 0) {
              tempHour = workhour[i].hours/60;
            tempMinutes = 0;
          } else {
            tempHour = (workhour[i].hours - workhour[i].hours % 60)/60;
            tempMinutes = workhour[i].hours % 60;
          }
          
          this.log[j] = {date: tempDate, hours: tempHour, minutes: tempMinutes};
          console.log(this.log[j]);
          j++;
        }
      };
      this.log.sort().reverse();
      console.log(this.log);
      if (this.log.length === 0) this.flashMessage.show('No entries found for the set range', {cssClass: 'alert-danger', timeout: 3000}); 
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  logHours(usname: String) {
    const log = {
      username: usname, // Username is passed from html component
      date: this.date, 
      hours: this.hours*60 + this.minutes // Multiply hours with 60 and sum it with minutes
    }
    
    //Required fields
    if(!this.validateService.validateLog(log)) {
      this.flashMessage.show('Check your log inputs', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };
  }
}
