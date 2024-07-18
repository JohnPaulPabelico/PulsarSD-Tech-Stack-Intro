import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as counterActions from 'src/app/state/counter.actions';
import * as fromRoot from 'src/app/state/app.state';
import * as fromCounter from 'src/app/state/counter.selector';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  count$!: Observable<number>;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.getCount();
  }

  getCount() {
    this.count$ = this.store.select(fromCounter.selectCount);
  }

  increment() {
    this.store.dispatch(counterActions.increment());
  }

  decrement() {
    this.store.dispatch(counterActions.decrement());
  }

  reset() {
    this.store.dispatch(counterActions.reset());
  }
}
