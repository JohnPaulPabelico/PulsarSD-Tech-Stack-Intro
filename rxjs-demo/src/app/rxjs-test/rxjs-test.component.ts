import { Component, OnInit } from '@angular/core';
import { of, from, fromEvent, interval, merge, combineLatest } from 'rxjs';
import {
  map,
  filter,
  switchMap,
  mergeMap,
  scan,
  tap,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-test',
  templateUrl: './rxjs-test.component.html',
  styleUrls: ['./rxjs-test.component.css'],
})
export class RxjsTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.testOperators();
  }

  testOperators() {
    // of operator
    const source1 = of(1, 2, 3, 4, 5);
    source1.subscribe((value) => console.log('of:', value));

    // from operator
    const source2 = from([10, 20, 30, 40, 50]);
    source2.subscribe((value) => console.log('from:', value));

    // fromEvent operator
    const button = document.querySelector('button');
    const source3 = fromEvent(button!, 'click');
    source3.subscribe((event) => console.log('fromEvent:', event));

    // interval operator
    const source4 = interval(1000);
    const subscription = source4.subscribe((value) =>
      console.log('interval:', value)
    );

    // Unsubscribe after 5 seconds
    setTimeout(() => subscription.unsubscribe(), 5000);

    // map operator
    const source5 = of(1, 2, 3).pipe(map((val) => val * 2));
    source5.subscribe((value) => console.log('map:', value));

    // filter operator
    const source6 = of(1, 2, 3, 4, 5).pipe(filter((val) => val % 2 === 0));
    source6.subscribe((value) => console.log('filter:', value));

    // switchMap operator
    const source7 = of(1, 2, 3).pipe(switchMap((val) => of(val * 2)));
    source7.subscribe((value) => console.log('switchMap:', value));

    // mergeMap operator
    const source8 = of(1, 2, 3).pipe(mergeMap((val) => of(val * 2)));
    source8.subscribe((value) => console.log('mergeMap:', value));

    // scan operator
    const source9 = of(1, 2, 3).pipe(scan((acc, val) => acc + val, 0));
    source9.subscribe((value) => console.log('scan:', value));

    // tap operator
    const source10 = of(1, 2, 3).pipe(
      tap((val) => console.log(`Side effect: ${val}`))
    );
    source10.subscribe((value) => console.log('tap:', value));

    // takeUntil operator
    const source11 = interval(1000);
    const notifier = fromEvent(button!, 'click');
    const example11 = source11.pipe(takeUntil(notifier));
    example11.subscribe((value) => console.log('takeUntil:', value));

    // merge operator
    const source12v1 = of('Hello');
    const source12v2 = of('World');
    const merged = merge(source12v1, source12v2);
    merged.subscribe((value) => console.log('merge:', value));

    // combineLatest operator
    const source13 = combineLatest([of('Hello'), of('World')]);
    source13.subscribe((value) => console.log('combineLatest:', value));
  }
}
