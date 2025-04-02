import axios from "axios";

axios.patch('http://localhost:3000/livros/1', {
    id: 2,
    
    titulo: 'O diário de Anne Frank',
    autor: 'Anne Frank',
    genero: 'Drama'
})

.then(response => {
    console.log('Atualizado com sucesso!!!');
})
.catch(error => {
    console.error('Ocorreu um erro: ', error)
})