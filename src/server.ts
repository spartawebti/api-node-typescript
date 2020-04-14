import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello Dev de 100mil'});
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});
