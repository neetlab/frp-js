import { from, of } from 'rxjs';
import { concatMap, mergeAll, toArray, withLatestFrom } from 'rxjs/operators';

const doTask = (text: string) => new Promise<string[]>(resolve => {
  setTimeout(() => {
    resolve([`${text}!`]);
  }, 1000);
});

(async () => {
  const things$ = from(['a', 'b', 'c']).pipe(
    concatMap(text => doTask(text)),
    mergeAll(),
    withLatestFrom(of(0))
  );

  things$.subscribe(result => console.log(result));
})();
