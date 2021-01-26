const Product = require("../models/product");

const {
    getPostData
} = require("../utils");

// Create a Product
// POST /api/products
async function createProduct(req, res, id) {
    try {
        const body = await getPostData(req);

        const {
            name,
            description,
            price,
            discount_price,
            stock_product,
            created_at,
            updated_at,
        } = JSON.parse(body);

        const product = {
            name,
            description,
            price,
            discount_price,
            stock_product,
            created_at,
            updated_at,
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({
            mesage: "Product Created Succesfully"
        }));
    } catch (error) {
        console.log(error);
    }
}

// Update a Product
// POST /api/product/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                mesage: "Product Not Found"
            }));
        } else {
            const body = await getPostData(req);

            const {
                name,
                description,
                price,
                discount_price,
                stock_product,
                updated_at,
            } = JSON.parse(body);

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
                discount_price: discount_price || product.discountPrice,
                stock_product: stock_product || product.stock_product,
                updated_at: updated_at,
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: `Product ${productData.name} updated succesfully`
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

// Buy a Product
// POST /api/product/:id?buy={amount}
async function buyProduct(id, amount, res, req) {
    try {
        const dataProduct = await Product.findById(id);
        if (!dataProduct) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                mesage: "Product Not Found"
            }));
        } else {
            const productData = {
                stock_product: dataProduct[0].stock_product - amount,
                name: dataProduct[0].name,
                description: dataProduct[0].description,
                price: dataProduct[0].price,
                discount_price: dataProduct[0].discountPrice,
                updated_at: dataProduct[0].updated_at,
                created_at: dataProduct[0].created_at,
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: `Product ${dataProduct[0].name} bought succesfully`
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

// Delete Products
// DEL /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                mesage: "Product Not Found"
            }));
        } else {
            await Product.remove(id);
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: `Product ${id} removed`
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

// Get All Products
// Get /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// Get Limted Products
// Get /api/products
async function getLimitedProducts(limit, res) {
    try {
        const products = await Product.findLimited(limit);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// Get Single Product by Id
// Get /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                mesage: "Product Not Found"
            }));
        } else {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

// Get Single Products by Name
// Get /api/product?name=:name
async function getProductByName(name, res) {
    try {
        const product = await Product.findByName(name);

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                mesage: "Product Not Found"
            }));
        } else {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    buyProduct,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
    getLimitedProducts
};