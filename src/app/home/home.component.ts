import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/rx'
import {Observer} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersSubscription : Subscription;
  packageSubscription : Subscription;

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
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