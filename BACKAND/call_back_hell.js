function getUser(callback) {
    setTimeout(() => {
        console.log("User mil gaya");
        callback();
    }, 1000);
}

function getPosts(callback) {
    setTimeout(() => {
        console.log("Posts mil gaye");
        callback();
    }, 1000);
}

function getComments(callback) {
    setTimeout(() => {
        console.log("Comments mil gaye");
        callback();
    }, 1000);
}

getUser(() => {
    getPosts(() => {
        getComments(() => {
            console.log("Sab kaam complete!");
        });
    });
});


function api() {
    return new Promise((resolve, reject) => {
        console.log("API call ho rahi hai...");

        setTimeout(() => {
            console.log("Data mil gaya");
            resolve("Success");
        }, 2000);
    });
}

api().then((result) => {
    console.log(result);
});