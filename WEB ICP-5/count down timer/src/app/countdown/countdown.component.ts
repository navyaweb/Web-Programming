import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  public events = [];
  public countDownTimes = [];
  public intervals = []
  public event = '';
  public time = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  saveEvent(){
    const eventObject = {
      id: this.events.length + 1,
      name: this.event,
      expectedDate: new Date(this.time),
      completed: false,

    }
    this.getCountDown(eventObject.expectedDate, this.events.length)
    this.events.push(eventObject);
    console.log(this.events)
  }

  countDown(event){

  }

  getCountDown(eventTime, index) {
    this.intervals[index] = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventTime.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countDownTimes[index]= {
        days,
        hours,
        minutes,
        seconds
      };
    }, 1000);
  }

  removeEvent(index) {
    this.events.splice(index,1)
    this.countDownTimes.splice(index,1)
    clearInterval(this.intervals[index]);
  }

  toggleEventComplete(index) {
    const event = this.events[index];
    event['completed'] = !event['completed'];
    this.events[index] = event;
    clearInterval(this.intervals[index]);
  }
}
