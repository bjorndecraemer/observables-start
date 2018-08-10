import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Observer, Subscription} from "rxjs";

import {map, filter} from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersSubscription : Subscription;
  packageSubscription : Subscription;

  ngOnInit() {
    const myNumbers = interval(1000)
      .pipe(map((data:number)=> {return data*2}),filter(data => data%4 === 0))
    this.numbersSubscription= myNumbers.subscribe(
      (number:number) => {
        console.log(number);
      }
    )

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    this.packageSubscription = myObservable.subscribe(
      (data:string)=>{console.log(data)},
      (error:string)=>{console.log(error)},
      ()=>{console.log('Completed!')}
    );

  }




  ngOnDestroy(){
    this.numbersSubscription.unsubscribe();
    this.packageSubscription.unsubscribe();
  }

  constructor() {
  }

}
