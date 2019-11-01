let sass = require('node-sass');
let fs = require('fs');
let createFolder = require('./folder');

let root = __dirname + "/..";

function render(inpath, outpath) {
    sass.render({
        file:inpath,
        includePaths: [root+'sass'],
        outputStyle: 
            //'compressed'
            //'compact'
            //'nested'
            'expanded'
    }, function(err, result) {
        if (err) {
            console.log('file: ', inpath);
            console.log('message: ', err.line, err.column, err.message);
        } else {
            fs.writeFile(outpath, result.css, e=>{
                let str = "success";
                if (e) {
                    str = "failure";
                }
                console.log(`${outpath}--->${str}`);
            })
        }
    });
}

try {
    //createFolder(root+'/sass/index');
    render(root + '/sass/header.scss', root+'/public/css/header.min.css');
} catch(err) {
    console.log('node-sass parser css', err);
}