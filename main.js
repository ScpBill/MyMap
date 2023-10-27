class MyMap {
    [Symbol.iterator]() {
        return this.entries();
    };
    constructor(args = null) {
        this.onlyKeys = [];
        this.onlyValues = [];
        if (Array.isArray(args)) {
            for (let entries of args) {
                if (!Array.isArray(entries) || entries.length != 2) continue;
                this.onlyKeys.push(entries.at(0));
                this.onlyValues.push(entries.at(1));
            }
        }
    };
    forEach(func) {
        for (let i = 0; i < this.onlyKeys.length; i++) {
            func(this.onlyValues.at(i), this.onlyKeys.at(i), this);
        }
    };

    set(key, value) {
        if (!this.onlyKeys.includes(key)) {
            this.onlyKeys.push(key);
            this.onlyValues.push(value);
        }
        this.size++;
        return this;
    };
    get(key) {
        if (this.onlyKeys.includes(key)) {
            return this.onlyValues.get(this.onlyKeys.indexOf(key));
        }
        return undefined;
    };
    has(key) {
        return this.onlyKeys.includes(key);
    };
    delete(key) {
        if (this.onlyKeys.includes(key)) {
            delete this.onlyValues[this.onlyKeys.indexOf(key)];
            delete this.onlyKeys[key];
        }
        this.size--;
        return this;
    };
    clear() {
        this.onlyKeys.clear();
        this.onlyValues.clear();
        this.size = 0;
        return this;
    };
    size = 0;
    keys = () => ({
        keys: this.onlyKeys,
        [Symbol.iterator]() {
            return {
                keys: this.keys,
                index: 0,
                next() {
                    if (this.index >= this.keys.length) {
                        return { done: true };
                    }
                    return { done: false, value: this.keys.at(this.index++) };
                }
            };
        }
    });
    values = () => ({
        values: this.onlyValues,
        [Symbol.iterator]() {
            return {
                values: this.values,
                index: 0,
                next() {
                    if (this.index >= this.values.length) {
                        return { done: true };
                    }
                    return { done: false, value: this.values.at(this.index++) };
                }
            };
        }
    });
    entries = () => ({
        keys: this.onlyKeys,
        values: this.onlyValues,
        [Symbol.iterator]() {
            return {
                keys: this.keys,
                values: this.values,
                index: 0,
                next() {
                    if (this.index >= this.keys.length) {
                        return { done: true };
                    }
                    return { done: false, value: [this.keys.at(this.index), this.values.at(this.index++)] };
                }
            };
        }
    });
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
