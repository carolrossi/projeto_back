import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";
import fs from 'fs'

const API_URL = 'http://localhost:3000';

fs.readFile('../livros.json', 'utf8', (err, data)=>{
    if (err) {
        console.log('Erro ao ler arquivo: ', err);
        return;
    }
   
    try{
        const dados = JSON.parse(data);
        console.log('Dados lidos do arquivo: \n', dados);
    } catch (error) {
        console.log('Erro ao analisar o JSON: ', error);
    }


async function listarLivros() {
    try {
        const response = await axios.get(`${API_URL}/livros`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('Erro ao listar livros: '), error.message);
        return [];
    }
}

async function exibirDetalhesLivros(id) {
    try {
        const response = await axios.get(`${API_URL}/livros/${id}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red(`Erro ao exibir livro com ID: ${id}`), error.message);
        return null;
    }
}



async function adicionarLivro() {
    try {
        const respostas = await inquirer.prompt([
            {
                type: "input",
                name: "titulo",
                message: chalk.hex('#79e1fd')('Digite o título do livro: '),
            },
            {
                type: "input",
                name: "autor",
                message: chalk.hex('#79e1fd')('Digite o autor do livro: '),
            },
            {
                type: "input",
                name: "genero",
                message: chalk.hex('#79e1fd')('Digite o gênero do livro: '),
            }
        ]);

        const novoLivro = {
            titulo: respostas.titulo,
            autor: respostas.autor,
            genero: respostas.genero
        };

        const response = await axios.post(`${API_URL}/livros`, novoLivro);
        console.log(chalk.green('Livro adicionado com sucesso!'));
        await exibirMenu();
    } catch (error) {
        console.error(chalk.red('Erro ao adicionar Livro: '), error.message );
    }
}

async function exibirMenu() {
    console.log('\n\n');
    const perguntas = [
        {
            type: "list",
            name: 'opcao',
            message: chalk.yellow('Escolha uma opção: '),
            choices: [
                { name: chalk.green('Listar livros'), value: 'listar' },
                { name: chalk.green('Exibir detalhes do livro'), value: 'exibir' },
                { name: chalk.green('Adicionar novo livro'), value: 'adicionar' },
                { name: chalk.red('Sair da operação'), value: 'sair' },
            ]
        }
    ]

    try {
        const resposta = await inquirer.prompt(perguntas);

        switch (resposta.opcao) {
            case 'listar':
                const livros = await listarLivros();
                console.log(livros);

                if (Array.isArray(livros) && livros.length > 0) {
                    console.log(chalk.green('Lista de livros:'));
                    livros.forEach(livro => {
                        console.log(`- ${chalk.whiteBright.bgMagentaBright(livro.id)}: ${chalk.magentaBright(livro.titulo)} - ${chalk.whiteBright(livro.autor)} - ${chalk.whiteBright(livro.genero)}`);
                    });
                } else {
                    console.log(chalk.cyanBright('Nenhum livro encontrado.'));
                }
                exibirMenu();
                break;

            case 'exibir':
                const idResposta = await inquirer.prompt([
                    {
                        type: "input",
                        name: "id",
                        message: chalk.blue('Digite o ID do livro: ')
                    }
                ]);
                const livro = await exibirDetalhesLivros(idResposta.id);
                if (livro) {
                    console.log(chalk.green('Detalhes do livro:'));
                    console.log(`- ${chalk.magentaBright(livro.id)}: ${chalk.whiteBright(livro.titulo)} - ${chalk.magentaBright(livro.autor)} - ${chalk.magentaBright(livro.genero)}`);
                } else {
                    console.log(chalk.yellow('Livro não encontrado!'));
                }
                await exibirMenu();
                break;

            case 'adicionar':
                await adicionarLivro();  
                break;

            case 'sair':
                console.log(chalk.yellow('Saindo do sistema...'));
                break;
        }
    } catch (error) {
        console.error(chalk.red('Erro'), error);
    }
}

exibirMenu();
});

