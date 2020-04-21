import { range, interval, zip } from "rxjs";
import { publish, map, tap } from "rxjs/operators";

zip(range(1, 10), interval(1000)).pipe(
  map((vs) => vs[1]),
  publish(
    tap(console.log),
  ),
).subscribe()
