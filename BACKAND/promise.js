// let promise = new Promise((resolve, reject) => {

//     console.log("I'm a new promise");
//     resolve("successfully resolved")
//     reject(" ythe process get rejected ");

// });
function GetData(dataId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            console.log("data", dataId);
            resolve("Successfully");

        }, 8000);

    });
}

let r = GetData(123);

const getPromise = () => {
    return new Promise((resolve, reject) => {
        console.log("Hii, here is Prashant Singh");
        resolve("sucessful")
        reject("unsuccesfull")
    });
};


let promise= getPromise();
promise.then(()=>{
    console,log("promise is full fill");
});
promise.catch(()=>{
    console.log("proceess toh chala hi nahi ")
})