import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConnectionCheckingService {
    IsOnline() : Observable<Boolean> {
        return new Observable<Boolean>(subscribe => {
            window.addEventListener('online', () => {
                subscribe.next(true);
            });

            window.addEventListener('offline', () => {
                subscribe.next(false);
            })
        });
    }
}