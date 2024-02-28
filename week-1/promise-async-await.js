function something() {
    return new Promise(function (resolve) {
        //do some async logic
        setTimeout(function () {
            resolve("hi there");
        }, 3000)
    })
}

async function main() {
    let value = await something();
    console.log("hi there 2");
    console.log('value: ', value);
}

main();
console.log("after main");
