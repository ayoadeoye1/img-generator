import express from 'express';
import path from 'path';
import cors from 'cors';

import router from './routes/genimage.router.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('./build')));

app.use('/api', router)
//frontend build
app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: './build' });
})

export default app;