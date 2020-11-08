const express = require("express");
const data = require('./data');
const cors = require('cors');
const app = express();

app.use(cors())
app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/api/products/:id', (req, res) => {
    console.log(req.params)
    const product = data.products.find(x => x._id === req.params.id)
    if(product) {
        res.send(product);
        console.log(product);
    } else {
        res.status(404).send({message: "product not found"})
    }
})

app.get('/', (req, res) => {
    res.send("server is ready")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`app is listening: ${PORT}`)
})