export class Person {
    constructor(private _name: string) { }
    get name(): string { return this._name };
}