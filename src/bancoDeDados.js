// Objeto que representa uma sequência para sempre pegar o próximo valor do id dos produtos
const sequencia = {
    _id: 1,
    get id() { return this._id++ }
}

// Objeto que vai receber a coleção de chaves e valores dos produtos (chave: ID, valores: nome e preço)
const produtos = {}

function salvarProduto(produto) {
    // Sempre gera um novo ID sequencial
    produto.id = sequencia.id;

    // Adiciona ou atualiza o produto no banco de dados
    produtos[produto.id] = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco
    };

    // Retorna o produto completo
    return produtos[produto.id];
}

// Função getProduto retornando o id do produto ou um objeto vazio
function getProduto(id) {
    return produtos[id] || {};
}

// Função para retornar todos os produtos
function getProdutos() {
    try {
        return Object.values(produtos).map(produto => ({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco
        }));
    } catch (error) {
        console.error('Erro ao obter produtos:', error.message);
        return [];
    }
}

// Função para excluir produtos do banco de dados
function excluirProduto(id) {
    const produto = produtos[id];
    delete produtos[id];
    return produto;
}

// Exportando funções para ficarem visíveis fora do arquivo
module.exports = { salvarProduto, getProduto, getProdutos, excluirProduto };
