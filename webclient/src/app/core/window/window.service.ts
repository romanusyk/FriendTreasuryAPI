import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WindowResizeEvent, WindowRef } from './windowRef.model';

@Injectable()
export class WindowService {
  private resizeSubject$: Subject<WindowResizeEvent> = new Subject();
  public onResize$: Observable<WindowResizeEvent> = this.resizeSubject$.asObservable();

  public constructor() {
    this.window.addEventListener('resize', (event: UIEvent) => this.resizeSubject$.next({event, window: this.window}));
  }

  public get window(): WindowRef {
    return window;
  }
}
