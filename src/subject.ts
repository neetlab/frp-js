import * as Rx from 'rxjs';
// import op from 'rxjs/operators';

let count = 0;

const kick = (subject$: Rx.Subject<string>) => {
  setInterval(() => {
    count += 1;
    subject$.next(count.toString());
  }, 1000);
}

(() => {
  const subject$ = new Rx.Subject<string>();
  subject$.subscribe(v => console.log('1st', v));
  subject$.subscribe(v => console.log('2nd', v));
  subject$.subscribe(v => console.log('3rd', v));
  kick(subject$);
})();
