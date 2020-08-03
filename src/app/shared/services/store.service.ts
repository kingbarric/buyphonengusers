import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '493 Abogo Largema Street, CBD Abuja 900211, Nigeria';
    email = 'info@buyphone.com.ng';
    phone = ['(080) 6676-3488'];
    hours = 'Mon-Sun 7:00am - 8:00pm';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
