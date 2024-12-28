import { Injectable } from "@angular/core";
import { TrackedWeight } from "../../types/TrackedWeight";
import { db } from "./db";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeightTrackingStore {
    add(trackedWeight: TrackedWeight): Observable<undefined> {
        const trackedAt = new Date(trackedWeight.trackedAt);
        trackedWeight.id = trackedAt.getFullYear() + trackedAt.getMonth() + trackedAt.getDate();
        return new Observable<undefined>(subscribe => {
            db.trackedWeights.where({ trackedAt: trackedWeight.trackedAt })
                .count()
                .then(count => {
                    if (count > 0) {
                        const error = new Error(`There is already a weight tracked for the ${trackedWeight.trackedAt}.`);
                        error.name = 'DuplicateDateNotPossible';
                        subscribe.error(error);
                    }
                });

            db.trackedWeights.add(trackedWeight)
                .catch(reason => {
                    const errorReceived: Error = reason;
                    const error = new Error('Could not add weight for unknown reason.')
                    error.cause = errorReceived.message;
                    subscribe.error(error);
                })
                .then(() => subscribe.complete());
        })
    }

    get(id: number): Observable<TrackedWeight> {
        return new Observable<TrackedWeight>(subscribe => {
            db.trackedWeights
                .where({ id: id })
                .first()
                .then(response => {
                    if (response === undefined) {
                        subscribe.error(`No item found with id ${id}.`);
                    }
                    else {
                        subscribe.next(response);
                    }
                })
        });
    }

    getLatest(): Observable<TrackedWeight | undefined> {
        return new Observable<TrackedWeight>(subscribe => {
            db.trackedWeights
                .orderBy('trackedAt')
                .reverse()
                .limit(1)
                .toArray()
                .then(entries => subscribe.next(entries[0]));
        });
    }

    list(): Observable<TrackedWeight[]> {
        return new Observable<TrackedWeight[]>(subscribe => {
            db.trackedWeights
                .limit(100)
                .toArray()
                .then(entries => {
                    subscribe.next(entries.sort((first, second) => {
                        let firstDate = new Date(first.trackedAt);
                        let secondDate = new Date(second.trackedAt);
                        let firstDateForSort = firstDate.getFullYear() + firstDate.getMonth() + firstDate.getDate();;
                        let secondDateForSort = secondDate.getFullYear() + secondDate.getMonth() + secondDate.getDate();;

                        return secondDateForSort - firstDateForSort;
                    }));
                });
        });
    }

    update(trackedWeight: TrackedWeight): Observable<void> {
        return new Observable(subscribe => {
            db.trackedWeights
                .where({ id: trackedWeight.id })
                .first()
                .then(tw => {
                    if (tw === undefined) {
                        subscribe.error();
                    }
                    else {
                        tw.weight = trackedWeight.weight;
                        db.trackedWeights
                        .update(tw.id, tw)
                        .then(result => subscribe.next());
                    }
                })
        })
    }

    delete(id: number): Observable<void> {
        return new Observable(subscribe => {
            db.trackedWeights
                .where({ id: id })
                .delete()
                .then(() => subscribe.next());
        });
    }
}