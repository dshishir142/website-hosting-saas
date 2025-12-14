import express, { urlencoded } from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';
import tenantRoute from './routes/tenantRoute';
const app = express();

const PORT = 8000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

app.use('/user', userRoute);
app.use('/tenant', tenantRoute);

app.listen(PORT, ()=>{
    console.log(`Sever is listening at port ${PORT}`);
})