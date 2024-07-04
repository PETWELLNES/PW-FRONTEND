import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showMainContent = new BehaviorSubject<boolean>(true);

  public showMainContent$ = this.showMainContent.asObservable();

  constructor() {}

  public toggleMainContent(show: boolean): void {
    this.showMainContent.next(show);
  }
}