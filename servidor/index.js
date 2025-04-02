import express from 'express'
import fs from 'fs';
import rotaslivros from './rotaslivros.js'
const app = express();
const port = 3000;
import rotasAdmin from './rotasAdmin.js'

app.use(express.json())





const logger = (req, res, next) => {
    const data = new Date();
    console.log(`${data.toISOString()} ${req.method} ${req.url}`)
    next();

    const newLine = `${data.toISOString()} ${req.method} ${req.url}`;
    fs.appendFile('log.txt', newLine, err => {
        if (err) throw err;
        console.log('Logging salvo')
    })
    
}

app.use(logger)



app.get('/', (req,res)=>{
    res.status(200).send('<h1 style="color:pink">Página Inicial</h1>');
});

app.use('/admin', rotasAdmin)
app.use('/livros', rotaslivros);


app.listen(port, ()=>{
    console.log(`Servidor rodando em http:localhost:${port}`)
});

