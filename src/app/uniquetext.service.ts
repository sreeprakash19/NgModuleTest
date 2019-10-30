import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AsyncValidator,
    AbstractControl,
    ValidationErrors
  } from '@angular/forms';
  import { catchError } from 'rxjs/operators';
  import { UserService } from './user.service';
  import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

  
  @Injectable({ providedIn: 'root' })
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private svc: UserService) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.svc.isAlterEgoTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => null)
    );
  }
}
