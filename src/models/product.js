const {
    v4: uuidv4
} = require("uuid");
const mysql = require("mysql2");
const format = require("node.date-time");

var db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL Connected");
    }
});

function findAll() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM products";
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            resolve(results);
        });
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products WHERE product_id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

function findByName(name) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products WHERE name = '${name}'`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

function findLimited(limit) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products Orders LIMIT ${limit}`;
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            resolve(results);
        });
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        let date = new Date().format("yyyy-M-d H:m:S");
        product.created_at = date;
        product.updated_at = date;
        const newProduct = {
            product_id: null,
            ...product
        };

        let sql = "INSERT INTO products SET ?";
        let query = db.query(sql, newProduct, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        let date = new Date().format("yyyy-M-d H:m:S");
        product.updated_at = date;
        const updatedProduct = {
            ...product
        };
        let sql = `UPDATE products SET name = '${product.name}', price = '${product.price}', discount_price = '${product.discount_price}', stock_product = '${product.stock_product}', description = '${product.description}', updated_at = '${product.updated_at}' WHERE product_id = ${id}`;
        let query = db.query(sql, updatedProduct, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM products WHERE product_id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result)
        });
    });
}

module.exports = {
    findAll,
    findById,
    findByName,
    findLimited,
    create,
    update,
    remove
};