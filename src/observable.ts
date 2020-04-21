import { Observable } from "rxjs";


const stream$ = new Observable(subscriber => {
  let num = 0;

  while (num < 5) {
    num += 1;
    subscriber.next(num);
  }
});

// Subscribeのたびにコンストラクタの関数が初期化されると考えていい
// 逆にSubjectはシングルトン的
stream$.subscribe(num => console.log(`1st: ${num}`));
stream$.subscribe(num => console.log(`2nd: ${num}`));
stream$.subscribe(num => console.log(`3rd: ${num}`));
