export class TrackedWeight {
    id: number = 0;
    weight: number = 0;
    trackedAt: Date = new Date();

    constructor(weight: number, trackedAt: Date) {
        this.weight = weight;
        this.trackedAt = trackedAt;
    }
}