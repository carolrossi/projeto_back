import express from 'express';
import fs from 'fs';
const router = express.Router();


router.get('/', (req, res) => {
    res.send(200).send('Lista de Produtos: ');
    
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Detalhes dos produtos com ID: ${id}`);
    if (livro) {
      res.json (livro);
  } else {
      res.status(404).send('<h1>Filme não encontrado</h1>');
  }
  });

router.delete('/:id', (req, res) => {
  const novoDelete = req.body;
  console.log('Livro deletado: ', novoDelete)
  res.send('Livro excluido com sucesso')
})

router.post('/', (req, res) => {
  const novoLivro = req.body;
  console.log('Livro adicionado: ', novoLivro)
  res.send('Livro adicionado com sucesso')
});

router.patch('/:id', (req, res) => {
  const livroAtualizado = req.body;
  console.log('Livro atualizado: ', livroAtualizado)
  res.send('Livro atualizado com sucesso')
});




export default router;
