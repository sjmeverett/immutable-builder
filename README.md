
# Immutable Builder

This library helps you to make builder objects, e.g. query builders, with immutable state.

It automatically adds an accessor/mutator method for each field starting with an underscore (`_`), named the same as the field without the leading underscore.  The method will return the value of the field if not supplied any arguments, or clone the object and set the field to the specified value if supplied, returning the new object.

There is also an `equals` method for convenience.

## Installation

    $ npm install --save immutable-builder

## Usage

```js
import Immutable from 'immutable-builder';

const Query = Immutable.new({
  _filter: {},
  _skip: 0,
  _limit: Number.NaN
});

let query = Query
  .filter({foo: 5})
  .skip(100)
  .limit(10);

/* query === {
  _filter: {foo: 5},
  _skip: 100,
  _limit: 10,
  filter: [Function],
  skip: [Function],
  limit: [Function]
} */

let limit = query.limit();
// limit is 10

let i = Query.skip(100);
let j = i.limit(10);
// i !== j
// i.equals(j) === false
// i.limit(10).equals(j) === true
```

## Docs

### `.new()`

Deeply clones the object.

### `.new(object)`

Deeply clones the object and merges it with the specified object.  Each field in `object` starting with an underscore will have an accessor/mutator method created for it as specified above.

### `.new(function)`

Deeply clones the object and calls the specified function with the object as the first argument.

### `.equals(object)`

Returns true if the supplied object deeply equals the object; otherwise, false.
