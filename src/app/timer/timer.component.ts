import {Component, OnInit, OnDestroy} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {Subscription} from "rxjs";
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timeLeft: number = 0;
  interval;
  subscribeTimer: any;
  abc;
  startStatus = false;
  disableStatus = false;
  timeSeconds = 0;
  timeLast;

  constructor() {
    const hours = Math.floor(this.timeLeft / 3600);
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.subscribeTimer =  hours + 'h' + ':' + minutes + 'm' + ':' + seconds + 's';
   }

  oberserableTimer() {

    if(this.startStatus == false){
      const source = timer(1000, 2000);
      this.startStatus = true;
      this.disableStatus = true;

      console.log("TimeLeft Start:");
      console.log(this.timeLeft);
      this.timeLast = this.timeLeft;
      this.abc = source.subscribe(val => {
        console.log("TimeLeft:");
        console.log(this.timeLeft);
        this.timeLast--;
        this.timeLeft--;
        const hours = Math.floor(this.timeLeft / 3600);
        this.timeLast %= 3600;
        const minutes = Math.floor(this.timeLast / 60);
        const seconds = this.timeLast % 60;
        this.subscribeTimer =  hours + 'h' + ':' + minutes + 'm' + ':' + seconds + 's';

        console.log("Hours:");
        console.log(hours);

        console.log("Minutes:");
        console.log(minutes);

        console.log("Seconds:");
        console.log(seconds);
      });
    }
    else{
      console.log("Timer paused");
      this.abc.unsubscribe();
      this.startStatus = false;
    }


  }

  resetTimer(){
    console.log("Timer Reset");
    this.subscribeTimer =  0 + 'h' + ':' + 0 + 'm' + ':' + 0 + 's';
    this.timeLeft = 0;
    this.abc.unsubscribe();
    this.startStatus = false;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  setTime(){
    this.timeLeft = this.timeSeconds;
    const hours = Math.floor(this.timeLeft / 3600);
    this.timeLeft %= 3600;
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.subscribeTimer =  hours + 'h' + ':' + minutes + 'm' + ':' + seconds + 's';
    this.timeLeft = this.timeSeconds;
    this.timeSeconds = null;
  }



  pauseTimer() {
    console.log("Timer paused");
    this.abc.unsubscribe();
    this.startStatus = false;
  }

  ngOnInit() {
  }

}
