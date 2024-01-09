const porta = 3003;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bancoDeDados = require('./bancoDeDados');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
    try {
        const produtos = bancoDeDados.getProdutos();
        if (produtos.length > 0) {
            res.status(200).json(produtos);
        } else {
            res.status(404).json({ message: 'Nenhum produto encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao obter produtos.' });
    }
});

// Rota para obter um produto específico pelo ID
app.get('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    try {
        const produto = bancoDeDados.getProduto(produtoId);
        if (produto && Object.keys(produto).length > 0) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao obter o produto.' });
    }
});

// Rota para cadastrar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    try {
        const novoProduto = bancoDeDados.salvarProduto({ nome, preco });
        res.status(201).json({ message: 'Produto cadastrado com sucesso.', produto: novoProduto });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao salvar o produto.' });
    }
});

// Rota para atualizar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    const { nome, preco } = req.body;
    try {
        const produtoAtualizado = bancoDeDados.salvarProduto({
            id: produtoId,
            nome,
            preco
        });
        res.status(200).json({ message: 'Produto atualizado com sucesso.', produto: produtoAtualizado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao atualizar o produto.' });
    }
});

// Rota para excluir um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    try {
        const produtoExcluido = bancoDeDados.excluirProduto(produtoId);
        if (produtoExcluido) {
            res.status(200).json({ message: 'Produto excluído com sucesso.', produto: produtoExcluido });
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao excluir o produto.' });
    }
});

app.listen(porta, () => {
    console.log(`Servidor sendo executado na porta ${porta}.`);
});
