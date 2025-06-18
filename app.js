/**********************************************************************************************************************************************************************************
 * Objetivo: API de uma livraria online
 * Data: 18/06/2025
 * Autor: Heloysa Vilela
 * Versões: 1.0
 * Observações:
 * ************ Para criar a API precisamos instalar:
 *              express   npm install express --save
 *              cors        npm install cors --save
 *              body-parser npm install body-parser --save
 * ************* Para criar conexão com o banco de dados MYSQL precisamos instalar:
 *               prisma        npm install prisma --save
 *               prisma/client npm install @prisma/client --save
 * 
 * Após a instalação do prisma é necessário inicializar o prisma:
 *             npx prisma init 
 * Para sincronização do prisma com o banco de dados podemos utilizar:
 *             npx prisma migrate dev 
 ***********************************************************************************************************************************************************************************/

/******************************************************************************************
 * ENDPOINTS PARA LIVROS
 * Autor: Thayla Amorim Mateus
 * Data: 18/06/2025
 ******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Middlewares
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})
const bodyParserJSON = bodyParser.json()

// Import do controller de livros
const controllerLivro = require('./controller/livro.js')
const controllerAutor = require('./controller/autores.js')
const controllerEditora = require('./controller/editoras.js')
const controllerLivrosAutores = require('./controller/livros_autores.js')
const controllerGenero = require('./controller/generos.js')




/****************************************************************************
 * ENDPOINTS DO LIVRO
 ******************************************************************************/

/** POST - Inserir novo livro */
app.post('/v1/livraria/livro', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await controllerLivro.inserirLivro(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

/** GET - Listar todos os livros */
app.get('/v1/livraria/livro', cors(), async (request, response) => {
    let result = await controllerLivro.listarLivro()

    response.status(result.status_code)
    response.json(result)
})

/** GET - Buscar livro por ID */
app.get('/v1/livraria/livro/:id', cors(), async (request, response) => {
    let idLivro = request.params.id
    let result = await controllerLivro.buscarLivro(idLivro)

    response.status(result.status_code)
    response.json(result)
})

/** DELETE - Excluir livro por ID */
app.delete('/v1/livraria/livro/:id', cors(), async (request, response) => {
    let idLivro = request.params.id
    let result = await controllerLivro.excluirLivro(idLivro)

    response.status(result.status_code)
    response.json(result)
})

/** PUT - Atualizar livro por ID */
app.put('/v1/livraria/livro/:id', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type']
    let idLivro = request.params.id
    let dadosBody = request.body
    let result = await controllerLivro.atualizarLivro(dadosBody, idLivro, contentType)

    response.status(result.status_code)
    response.json(result)
})



/****************************************************************************
 * ENDPOINTS DO AUTOR
 ******************************************************************************/
app.post('/v1/livraria/autor', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let dadosBody = req.body
    let result = await controllerAutor.inserirAutor(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/autor', cors(), async (req, res) => {
    let result = await controllerAutor.listarAutores()
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/autor/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerAutor.buscarAutor(id)
    res.status(result.status_code).json(result)
})

app.delete('/v1/livraria/autor/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerAutor.excluirAutor(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/livraria/autor/:id', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dadosBody = req.body
    let result = await controllerAutor.atualizarAutor(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})




/****************************************************************************
 * ENDPOINTS DA EDITORA
 ******************************************************************************/


app.post('/v1/livraria/editora', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let dadosBody = req.body
    let result = await controllerEditora.inserirEditora(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/editora', cors(), async (req, res) => {
    let result = await controllerEditora.listarEditoras()
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/editora/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerEditora.buscarEditora(id)
    res.status(result.status_code).json(result)
})

app.delete('/v1/livraria/editora/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerEditora.excluirEditora(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/livraria/editora/:id', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dadosBody = req.body
    let result = await controllerEditora.atualizarEditora(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})




/****************************************************************************
 * ENDPOINTS DO LIVRO AUTOR
 ******************************************************************************/

// POST - Criar relação livro ↔ autor
app.post('/v1/livraria/livros-autores', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let dadosBody = req.body
    let result = await controllerLivrosAutores.inserirRelacaoLivroAutor(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

// GET - Listar todas as relações
app.get('/v1/livraria/livros-autores', cors(), async (req, res) => {
    let result = await controllerLivrosAutores.listarRelacoes()
    res.status(result.status_code).json(result)
})

// DELETE - Remover relação entre livro e autor
app.delete('/v1/livraria/livros-autores/:livro_id/:autor_id', cors(), async (req, res) => {
    let { livro_id, autor_id } = req.params
    let result = await controllerLivrosAutores.excluirRelacaoLivroAutor(livro_id, autor_id)
    res.status(result.status_code).json(result)
})




/****************************************************************************
 * ENDPOINTS DO GENERO
 ******************************************************************************/

app.post('/v1/livraria/genero', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let dadosBody = req.body
    let result = await controllerGenero.inserirGenero(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/genero', cors(), async (req, res) => {
    let result = await controllerGenero.listarGeneros()
    res.status(result.status_code).json(result)
})

app.get('/v1/livraria/genero/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerGenero.buscarGenero(id)
    res.status(result.status_code).json(result)
})

app.delete('/v1/livraria/genero/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerGenero.excluirGenero(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/livraria/genero/:id', cors(), bodyParserJSON, async (req, res) => {
    let contentType = req.headers['content-type']
    let id = req.params.id
    let dadosBody = req.body
    let result = await controllerGenero.atualizarGenero(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})


/** Iniciar servidor */
app.listen(8080, () => {
    console.log('Servidor aguardando requisições na porta 8080...')
})
