import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

from([1, 2, 3]).pipe(
  finalize(() => void console.log('foo')),
  finalize(() => void console.log('bar')),
  finalize(() => void console.log('bal')),
).subscribe();

/**
 * --> bal
 * --> bar
 * --> foo
 */
