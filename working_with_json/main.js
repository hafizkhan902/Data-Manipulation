const fs = require('fs');
const http = require('http');
const url=require('url');


let products=JSON.parse(fs.readFileSync('./Data/product.json','utf-8'));
let productlisthtml=fs.readFileSync('./templates/product-list.html','utf-8');

 let htmlproductArray=products.map((prod)=>{
    let output=productlisthtml.replace('{{%IMAGE%}}',prod.productImage);
    output=output.replace('{{%NAME%}}',prod.name);
    output=output.replace('{{%MODELNAME%}}',prod.modelName);
    output=output.replace('{{%MODELNO%}}',prod.modeName);
    output=output.replace('{{%SIZE%}}',prod.size);
    output=output.replace('{{%CAMERA%}}',prod.camera);

    return output;

})

// Read the HTML file asynchronously
fs.readFile('./templates/index.html', 'utf-8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    const producthtml=htmlproductArray.join('</html>');

    const server = http.createServer((req, res) => {
        console.log("Server is created");
        const path = req.url;

        if (path === '/' || path === '/home') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html.replace('{{%content%}}','You are in the home page'));
        }
        else if(path==='/about'){
            res.writeHead(200,{'Content-Type' : 'text/html'});
            res.end(html.replace('{{%content%}}',productlisthtml));
        }
        else if(path==='/product'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html.replace('{{%content%}}',producthtml));
            console.log();
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(html.replace('{{%content%}}','404 Page not found'));
        }
    });

    server.listen(3000, () => {
        console.log('Server started');
    });
});







