console.log("hi (1)");

setTimeout(function a() {
    console.log("From async fn a");
}, 20000);

setTimeout(function b() {
    console.log("From async fn b");
}, 10000);

let a = 0;
for (let i = 0; i <= 1000000000; i++) {
    a = a + i;
}

console.log(a);