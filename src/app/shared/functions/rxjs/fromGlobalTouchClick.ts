import { Observable } from 'rxjs';
import { fromTouchClick } from './fromTouchClick';
import { share } from 'rxjs/operators';

let globalListener = null;

export function fromGlobalTouchClick(): Observable<TouchEvent> {
    if (globalListener === null) {
        globalListener = fromTouchClick(document).pipe(share());
    }

    return globalListener;
}
