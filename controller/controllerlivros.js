/**
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de livros
 * Data: 18/06/2025
 * Autor:  Heloysa Vilela
 * Versão: 1.0
 */

const MESSAGE = require('../../modulo/config.js')
const livroDAO = require('../../model/dao/livro.js')

// Inserir novo livro
const inserirLivro = async function (livro, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !livro.titulo || livro.titulo.length > 255 ||
                !livro.isbn || livro.isbn.length > 20 ||
                !livro.ano_publicacao || !livro.numero_paginas ||
                !livro.editora_id || !livro.genero_id
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await livroDAO.insertLivro(livro)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualizar livro
const atualizarLivro = async function (livro, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !livro.titulo || livro.titulo.length > 255 ||
                !livro.isbn || livro.isbn.length > 20 ||
                !livro.ano_publicacao || !livro.numero_paginas ||
                !livro.editora_id || !livro.genero_id ||
                !id || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let exists = await buscarLivro(id)
                if (exists.status_code === 200) {
                    livro.id = id
                    let result = await livroDAO.updateLivro(livro)
                    return result ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return exists
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Deletar livro
const excluirLivro = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0)
            return MESSAGE.ERROR_REQUIRE_FIELDS

        let exists = await buscarLivro(id)
        if (exists.status_code === 200) {
            let result = await livroDAO.deleteLivro(id)
            return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return exists
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Listar todos os livros
const listarLivro = async function () {
    try {
        let dadosLivro = {}
        let result = await livroDAO.selectAllLivro()

        if (result && result.length > 0) {
            dadosLivro.status = true
            dadosLivro.status_code = 200
            dadosLivro.item = result.length
            dadosLivro.livros = result
            return dadosLivro
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Buscar livro por ID
const buscarLivro = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0)
            return MESSAGE.ERROR_REQUIRE_FIELDS

        let result = await livroDAO.selectByIdLivro(id)
        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                livros: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirLivro,
    atualizarLivro,
    excluirLivro,
    listarLivro,
    buscarLivro
}
