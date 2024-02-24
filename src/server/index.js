import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

const app = express();
const port = process.env.PORT_SERVER;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    log(`Listening on port: ${port}`);
});

app.get('/api/test', function (req, res) {
    log('/api/test');

    return res.json('Hello from server!');
});
