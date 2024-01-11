require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const authRouter = require('./routes/auth');

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
