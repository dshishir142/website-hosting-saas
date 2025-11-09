import express from "express";
import cors from 'cors';
import userRoute from './routes/userRoute'

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/', userRoute);

app.listen(PORT, ()=>{
    console.log(`Server listening in port ${PORT}`);
})