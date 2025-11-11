import express, { urlencoded } from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);

app.listen(PORT, ()=>{
    console.log(`Sever is listening at port ${PORT}`);
})