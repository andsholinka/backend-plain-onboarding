const http = require("http");
require('dotenv/config')

const {
    getProducts,
    getLimitedProducts,
    getProductByName,
    getProduct,
    buyProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("./src/controllers/productController");

const server = http.createServer((req, res) => {
    var uri = require("url").parse(req.url, true);
    if (uri.search != null) {
        if (uri.search.includes("limit") && req.method === "GET") {
            let limit = uri.query.limit;
            getLimitedProducts(limit, res);
        }
        if (uri.search.includes("name") && req.method === "GET") {
            let name = uri.query.name;
            getProductByName(name, res);
        }
    } else if (
        req.url.match(/\/api\/product\/([0-9]+)/) &&
        req.method === "POST"
    ) {
        if (uri.search.includes("buy")) {
            const id = req.url.split("/")[3][0];
            let amount = uri.query.buy;
            buyProduct(id, amount, res, req);
        }
    } else if (req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    } else if (
        req.url.match(/\/api\/product\/([0-9]+)/) &&
        req.method === "GET"
    ) {
        const id = req.url.split("/")[3];
        getProduct(req, res, id);
    } else if (req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    } else if (
        req.url.match(/\/api\/product\/([0-9]+)/) &&
        req.method === "PUT"
    ) {
        const id = req.url.split("/")[3];
        updateProduct(req, res, id);
    } else if (
        req.url.match(/\/api\/product\/([0-9]+)/) &&
        req.method === "DELETE"
    ) {
        const id = req.url.split("/")[3];
        deleteProduct(req, res, id);
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({
            mesage: "Route Not Found"
        }));
    }
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));