// REQUIRE NODE MODULES

const http = require('http');
const fs = require('fs');       // File System Module
const url = require('url');

// READING DATA FILE SYNCHRONOUSLY

let html = fs.readFileSync('./index.html', 'utf-8');

const data = JSON.parse(fs.readFileSync('./Data/data.json', 'utf-8')); // Parsing JSON data into Javascript Object

let product_html = fs.readFileSync('./productList.html', 'utf-8');

let product_list = data.map(item =>{
    let product = product_html.replace('{{%name%}}', item.name);
    product = product.replace('{{%color%}}', item.color);
    product = product.replace('{{%rom%}}', item.ROM);
    product = product.replace('{{%size%}}', item.size);
    product = product.replace('{{%camera%}}', item.camera);
    product = product.replace('{{%price%}}', item.price);
    product = product.replace('{{%image%}}', item.productImage);
    product = product.replace('{{%details%}}', `/product?id=${item.id}&name=iPhone`)
    return product;
})

// CREATING SERVER

const server = http.createServer((request, response)=>{

    let {query, pathname:path} = url.parse(request.url, true);

    if(path === '/' || path.toLocaleLowerCase() === '/home')          // route according to url
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end(html.replace('{{%container%}}', "You are on home page"));
    }

    else if(path.toLocaleLowerCase() === '/about')          
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end(html.replace('{{%container%}}', "You are on about page"));
    }

    else if(path.toLocaleLowerCase() === '/contact')
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end(html.replace('{{%container%}}', "You are on contact page"));
    }

    else if(path.toLocaleLowerCase() === '/product')
    {
        if(!query.id)
        {
            response.writeHead(200, {
                "Content-Type" : "text/html"
            })
            response.end(html.replace('{{%container%}}', product_list.join(',')));
            //console.log(product_list.join(','));
        }
        else
        {
            let product_detail = data.filter(ele=>{
                if(ele.id == query.id)
                return ele;
            })
            product_detail = product_detail[0];

            let pd_html = fs.readFileSync('./productDetail.html', 'utf-8');

                let pd = pd_html.replace('{{%name%}}', product_detail.name);
                pd = pd.replace('{{%color%}}', product_detail.color);
                pd = pd.replace('{{%rom%}}', product_detail.ROM);
                pd = pd.replace('{{%size%}}', product_detail.size);
                pd = pd.replace('{{%camera%}}', product_detail.camera);
                pd = pd.replace('{{%price%}}', product_detail.price);
                pd = pd.replace('{{%image%}}', product_detail.productImage);
                pd = pd.replace('{{%description%}}', product_detail.Description)
                pd = pd.replace('{{%model%}}', product_detail.modelNumber)

                console.log(product_detail)

            response.writeHead(200, {
                "Content-Type" : "text/html"
            })
            response.end(html.replace('{{%container%}}', pd));
            console.log(pd)
        }
    }

    else if(path.toLocaleLowerCase() === '/blog')
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end(html.replace('{{%container%}}', "You are on blog page"));
    }

    else if(path.toLocaleLowerCase() === '/buy')
    {
        response.writeHead(200, {
            "Content-Type" : "text/html"
        })
        response.end(html.replace('{{%container%}}', "You have successfully place the product in cart !"));
    }

    else{
        response.writeHead(404, {
            "Content-Type" : "text/html"
        })
        response.end('Page not found');
    }
})

// LISTNING THE SERVER

server.listen(5000, '127.0.0.1', ()=>{
    console.log("Server has started")
})
