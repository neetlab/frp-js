import { ReplaySubject, Subject } from 'rxjs';

const kick = (subscriber: Subject<number>) => {
  let num = 0;

  while (num < 5) {
    num += 1;
    subscriber.next(num);
  }
}

(() => {
  const stream$ = new ReplaySubject<number>();
  stream$.subscribe(num => console.log(`initial subscription: ${num}`));
  kick(stream$);
  // stream$がSubjectなら、これは呼ばれない
  stream$.subscribe(num => console.log(`delayed subscription: ${num}`));
})();
