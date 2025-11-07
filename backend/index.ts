import express from 'express';
import cors from 'cors';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req,res)=> res.send(req.host));

app.listen(PORT, ()=>{
    console.log(`server is running in port ${PORT}`);
})