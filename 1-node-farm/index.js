const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

//Sync
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about an avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log(fs.readFileSync("./txt/output.txt", "utf-8"));

//Async
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         fs.readFile("./txt/final.txt", "utf-8", (err, data4) => {
//           console.log(data4);
//         });
//       });
//     });
//   });
// });
// console.log("The file is being read");

const tempOverview = fs.readFileSync(__dirname + '/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync(__dirname + '/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync(__dirname + '/templates/template-product.html', 'utf-8');

const data = fs.readFileSync(__dirname + '/dev-data/data.json', 'utf-8');
const dataParsed = JSON.parse(data);

// const slugName = dataParsed.map((el) =>
//   slugify(el.productName, { lower: true })
// );
// console.log(slugName);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataParsed.map((el) => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    res.end(output);

    //Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataParsed[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    //API Page
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page is not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('The server is running om port 8000...');
});
