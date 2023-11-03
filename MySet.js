class MySet {
    #entries = [];
    constructor(iterable = null) {
        if (iterable === null || iterable === undefined) return;
        
        if (typeof iterable[Symbol.iterator] !== 'function') {
            let nameOfObject = `${typeof iterable + iterable instanceof Object ? '' : ' ' + iterable}`;
            throw new TypeError(`${nameOfObject} is not iterable (cannot read property ${Symbol.iterator})`);
        }
        for (let entry of iterable) {
            if (!this.#entries.has(entry)) {
                this.#entries.push(entry);
            }
        }
    }
    get size() {
        return this.#entries.length;
    }
    set size(value) {
        return value;
    }
    *[Symbol.iterator]() {
        yield* this.#entries;
    }
    add(value) {
        if (!this.#entries.includes(value)) {
            this.#entries.push(value);
        }
        return this;
    }
    clear() {
        this.#entries = [];
    }
    delete(value) {
        let indexKey = this.#entries.findIndex(e => e === value);
        if (indexKey !== -1) {
            this.#entries.splice(indexKey, 1);
            return true;
        } else {
            return false;
        }
    }
    *entries() {
        for (let entry of this.#entries) {
            yield entry;
        }
    }
    forEach(callbackFn, thisArg = null) {
        for (const entry of this.#entries) {
            callbackFn.call(thisArg, entry, entry, this);
        }
    }
    has(value) {
        return this.#entries.includes(value);
    }
    *keys() {
        yield* this.entries;
    }
    *values() {
        yield* this.entries();
    }
    get [Symbol.toStringTag]() {
        return 'MySet';
    }
}
