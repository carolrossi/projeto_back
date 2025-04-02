import axios from "axios";

axios.get('http://localhost:3000/livros')

.then(response => {
    console.log('Atualizado com sucesso!!!' , response.data);
})
.catch(error => {
    console.error('Ocorreu um erro: ', error)
})

axios.get('http://localhost:3000/livros/2')

.then(response => {
    console.log('Atualizado com sucesso!!!', response.data);
})
.catch(error => {
    console.error('Ocorreu um erro: ', error)
})