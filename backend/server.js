const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb://127.0.0.1:27017/amazona',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log('connected to DB')
);

app.get('/', (req, res) => {
    res.send('server is ready');
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is listening: ${PORT}`);
});
