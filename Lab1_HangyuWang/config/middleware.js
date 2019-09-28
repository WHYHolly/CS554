

function middle1(request, response, next) {
    const currentBody = JSON.stringify(request.body);
    const currentPath = request.protocol + '://' + request.get('host') + request.originalUrl;
    const currentHTTP = request.method;

    console.log("===================Request Start(middle1)====================");
    console.log(`Body: ${currentBody}`);
    console.log(`URL: ${currentPath}`);
    console.log(`HTTP: ${currentHTTP}`);
    console.log("========================Request End=========================")

    next();
}

let Accessed = {};
let totalAccessedtimes = 0;

function middle2(request, response, next) {
    const curPath = request.protocol + '://' + request.get('host') + request.originalUrl;
    if(!Accessed[curPath]){
        Accessed[curPath] = 1;
    }else{
        Accessed[curPath]++;
    }
    totalAccessedtimes++;

    console.log("===================Request Start(middle2)====================");
    console.log(`Now this website has been accessed for ${totalAccessedtimes} times:`);
    for(let path in Accessed){
        console.log(`The path ${path} has been accessed for ${Accessed[path]} times`);
    }
    console.log("========================Request End=========================")

    next();
}

module.exports = {
    middle1,
    middle2
};