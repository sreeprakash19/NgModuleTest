import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public counter = 0;
  hellotext = '';
  hello = 0 ;
  footerdisplay = '';
  public myData: BehaviorSubject<number> = new BehaviorSubject<number>(this.hello);

  increaseCounter() {
    this.counter++;
    this.hello = this.counter;
    this.myData.next(this.hello);
  }


}
