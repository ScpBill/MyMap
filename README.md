# MyMap

MyMap is a custom implementation of the Map object in JavaScript. It provides similar functionality as the native Map object, allowing you to store key-value pairs and perform various operations on the data.

## Clone

To use MyMap in your JavaScript project, you can download `MyMap.js` file along with the entire project via the git tool:

```bash
git clone https://github.com/ScpBill/MyMap.git
```

## Usage

### Creating a MyMap Object

To create a new instance of MyMap, you can use the following syntax:

```javascript
const map = new MyMap();
```

### Setting and Getting Values

You can set key-value pairs in the MyMap object using the `set` method, similar to the native Map:

```javascript
map.set('key1', 'value1');
map.set('key2', 'value2');
```

To get the value associated with a specific key, you can use the `get` method:

```javascript
console.log(map.get('key1')); // Output: value1
console.log(map.get('key2')); // Output: value2
```

### Checking Existence of Keys

You can check if a key exists in the MyMap object using the `has` method:

```javascript
console.log(map.has('key1')); // Output: true
console.log(map.has('key3')); // Output: false
```

### Removing Key-Value Pairs

To remove a key-value pair from the MyMap object, you can use the `delete` method:

```javascript
map.delete('key2');
console.log(map.get('key2')); // Output: undefined
```

### Iterating Over MyMap

Just like with the native Map object, you can use the `forEach` method to iterate over the key-value pairs in MyMap:

```javascript
map.forEach((value, key) => {
    console.log(key, value);
});
```

### Size and Clear

You can get the number of key-value pairs in the MyMap object using the `size` property:

```javascript
console.log(map.size); // Output: 1
```

To remove all key-value pairs from the MyMap object, you can use the `clear` method:

```javascript
map.clear();
console.log(map.size); // Output: 0
```

## Difference

Despite the full functionality, the user implementation cannot display the Map object in the same way via console.log. For example:

```javascript
const arr = [['key1', 'value1']];
console.log(new Map(arr));
console.log(new MyMap(arr));
```
Output:
```javascript
Map(1) {"key1" => "value1"}
  [[Entries]]
    0: {"key1" => "value1"}
  size: 1

MyMap {_entries: Array(1)}
  _entries:
    0: {key: 'key1', value: 'value1'}
    length: 1
  size: 1
```

## Comparison to Map Object

Please note that MyMap is not a built-in JavaScript object and is not a part of the official ECMAScript specification. It is a custom implementation created for the purposes of this project.
