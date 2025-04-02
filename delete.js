import axios from 'axios';

axios.delete("http://localhost:3000/livros/5")
    .then(response => {
        console.log('Livro excluído com sucesso!!!');
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })
    