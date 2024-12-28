import Dexie, { Table } from 'dexie';

export interface TrackedWeight {
    id: number;
    weight: number;
    trackedAt: Date;
}

export class AppDB extends Dexie {
    trackedWeights!: Table<TrackedWeight>

    constructor() {
        super('ngdexieliveQuery');
        this.version(1).stores({
            trackedWeights: 'id, weight, trackedAt'
        });
    }
}

export const db = new AppDB();