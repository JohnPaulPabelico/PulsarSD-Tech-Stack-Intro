import { createReducer, on } from '@ngrx/store';
import * as counterActions from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(counterActions.increment, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(counterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
  })),
  on(counterActions.reset, (state) => ({
    ...state,
    count: 0,
  }))
);
