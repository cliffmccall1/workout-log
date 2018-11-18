import { Component, OnInit } from '@angular/core';

//  // import ng2-simple-timer as SimpleTimer
// import { SimpleTimer } from 'ng2-simple-timer';

// @Component({

//   selector: 'app-timer',
//   templateUrl:'./timer.component.html',
//   //  `
//   // <h3>{{title}}</h3>
//   // <div><button (click)="subscribeTimer0()">{{timer0button}} Time</button>{{counter0}}</div>
//   // <br>
//   // <div  2><button (click)="delAllTimer()">Stop</button></div>
//   // <br>
//   // <div><button (click)="resetTimer()"> Reset </button></div>`,
//   styleUrls: ['./timer.component.css']

//  })

// export class TimerComponent implements OnInit {
//   import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  name = 'Workout Log';
  timeSeconds = 0;
  timeMinutes = 0;
  remainderSeconds = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeSeconds >= 0) {
        this.timeSeconds++;
        this.timeMinutes = Math.floor(this.timeSeconds / 60);
        this.remainderSeconds = this.timeSeconds % 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.timeSeconds = 0;
    this.timeMinutes = 0;
    this.remainderSeconds = 0;
  }
}
