class MyMap {
    constructor(iterable = null) {
        this._entries = [];

        if (iterable === null || iterable === undefined) return;

        if (typeof iterable[Symbol.iterator] !== 'function') {
            let nameOfObject = `${typeof iterable + iterable instanceof Object ? '' : ' ' + iterable}`;
            throw new TypeError(`${nameOfObject} is not iterable (cannot read property ${Symbol.iterator})`);
        }
        for (let entry of iterable) {
            if (!(entry instanceof Object)) {
                throw new TypeError(`Iterator value ${entry} is not an entry object`)
            }
            let indexEntry = this._entries.indexOf(entry[0]);
            if (indexEntry === -1) {
                this._entries.push({ key: entry[0], value: entry[1] });
            } else {
                this._entries[indexEntry].value = entry[1];
            }
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
        return this._entries.length;
    }
    set size(value) {
        return value;
    }
    get [Symbol.toStringTag]() {
        return 'MyMap';
    }
    clear() {
        this._entries = [];
    }
    delete(key) {
        let indexKey = this._entries.findIndex(x => x.key == key);
        if (indexKey !== -1) {
            this._entries.splice(indexKey, 1);
            return true;
        } else {
            return false;
        }
    }
    entries() {
        let index = 0;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => ({
                value: index >= this._entries.length ? undefined : [this._entries[index].key, this._entries[index].value],
                done: index++ >= this._entries.length
            })
        };
    }
    forEach(callbackFn, thisArg = null) {
        for (let i = 0; i < this._entries.length; i++) {
            callbackFn.call(thisArg || globalThis, this._entries[i].value, this._entries[i].key, this);
        }
    }
    get(key) {
        let indexKey = this._entries.findIndex(x => x.key == key);
        return indexKey === -1 ? undefined : this._entries[indexKey].value;
    }
    has(key) {
        return this._entries.some(x => x.key == key);
    }
    keys() {
        let index = 0;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => ({
                value: index >= this._entries.length ? undefined : this._entries[index].key,
                done: index++ >= this._entries.length
            })
        };
    }
    set(key, value) {
        let indexKey = this._entries.findIndex(x => x.key == key);
        if (indexKey !== -1) {
            this._entries[indexKey].value = value;
        } else {
            this._entries.push({ key, value });
        }
    }
    values() {
        let index = 0;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => ({
                value: index >= this._entries.length ? undefined : this._entries[index].value,
                done: index++ >= this._entries.length
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
  
