"use strict";
function mapObject(object, fn) {
    let newObject = Object.keys(object).reduce((acc, curr) => {
        acc[curr] = fn(object[curr]);
        return acc;
    }, {});
    console.log(newObject);
    return newObject;
}
const object = { "roma": 5, "vasya": 2 };
function int(int) {
    return int > 2;
}
mapObject(object, int);
