class MyMap {
    constructor(iterable = null) {
        this._keys = [];
        this._values = [];

        if (iterable === null || iterable === undefined) return;

        if (typeof iterable[Symbol.iterator] !== 'function') {
            let nameOfObject = `${typeof iterable + iterable instanceof Object ? '' : ' ' + iterable}`;
            throw new TypeError(nameOfObject + 'is not iterable (cannot read property Symbol(Symbol.iterator))');
        }
        for (let entry of iterable) {
            if (!(entry instanceof Object)) {
                let nameOfObject = entry.toString();
                throw new TypeError(`Iterator value ${nameOfObject} is not an entry object`)
            }
            let indexEntry = this._keys.indexOf(entry[0]);
            indexEntry === -1 ? this._keys.push(entry[0]) : this._keys[indexEntry] = entry[0]
            indexEntry === -1 ? this._values.push(entry[1]) : this._values[indexEntry] = entry[1]
        }
    }
    static groupBy(items, callbackFn) {
        const mapObj = new this();
        items.forEach((item) => {
            let keyValue = callbackFn(item);
            mapObj.set(keyValue, item);
        });
        return mapObj;
    }
    get size() {
        return this._keys.length;
    }
    set size(value) {
        return value;
    }
    get [Symbol.toStringTag]() {
        return 'MyMap';
    }
    clear() {
        this._keys = [];
        this._values = [];
    }
    delete(key) {
        let indexKey = this._keys.indexOf(key);
        if (indexKey !== -1) {
            this._keys.splice(indexKey, 1);
            this._values.splice(indexKey, 1);
            return true;
        } else {
            return false;
        }
    }
    entries() {
        let index = 0;
        let entries = Array.from(
            {length: this._keys.length},
            (_, i) => [this._keys[i], this._values[i]]
        )
        return {
            next: () => ({
                value: index >= this._keys.length ? undefined : entries[index],
                done: index++ >= this._keys.length
            })
        };
    }
    forEach(callbackFn, thisArg = null) {
        for (let i = 0; i < this._keys.length; i++) {
            callbackFn.call(thisArg || window, this._values[i], this._keys[i], this);
        }
    }
    get(key) {
        let indexKey = this._keys.indexOf(key);
        return indexKey === -1 ? undefined : this._values[indexKey];
    }
    has(key) {
        return this._keys.includes(key);
    }
    keys() {
        let index = 0;
        return {
            next: () => ({
                value: index >= this._keys.length ? undefined : this._keys[index],
                done: index++ >= this._keys.length
            })
        };
    }
    set(key, value) {
        let indexKey = this._keys.indexOf(key);
        if (indexKey !== -1) {
            this._values[indexKey] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }
    }
    values() {
        let index = 0;
        return {
            next: () => ({
                value: index >= this._keys.length ? undefined : this._values[index],
                done: index++ >= this._keys.length
            })
        };
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}



let recipeMap = new MyMap([
    ["огурец", 500],
    ["помидор", 350],
    ["лук",    50]
  ]);
  
  // перебор по ключам (овощи)
  for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // огурец, помидор, лук
  }
  
  // перебор по значениям (числа)
  for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
  }
  recipeMap.forEach((value, key, map) => {
    console.log(`${key}: ${value}`); // огурец: 500 и так далее
  });
  let map = new Map([
    ['1',  'str1'],
    [1,    'num1'],
    [true, 'bool1']
  ]);
  console.log(map.get('1'))
  // перебор по элементам в формате [ключ, значение]
  for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
    console.log(entry); // огурец,500 (и так далее)
  }
  
