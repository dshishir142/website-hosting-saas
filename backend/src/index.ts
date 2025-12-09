import express, { urlencoded } from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
import tenantRoute from './routes/tenantRoute';
const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/tenant', tenantRoute);

app.listen(PORT, ()=>{
    console.log(`Sever is listening at port ${PORT}`);
})