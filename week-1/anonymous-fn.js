function sum(a, b, callback) {
    const val1 = callback(a);
    const val2 = callback(b);

    return val1 + val2;
}

const result = sum(1, 3, function (n) {
    return n * n;
});

console.log(result);