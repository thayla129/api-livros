/**
 * Objetivo: Controller responsável pelo CRUD da relação Livro-Autor
 * Data: 18/06/2025
 * Autor: Heloysa Vilela
 * Versão: 1.0
 */

const MESSAGE = require('../../modulo/config.js')
const livrosAutoresDAO = require('../../model/dao/livros_autores.js')

const inserirRelacaoLivroAutor = async function (relacao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!relacao.livro_id || !relacao.autor_id || isNaN(relacao.livro_id) || isNaN(relacao.autor_id)) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await livrosAutoresDAO.insertRelacaoLivroAutor(relacao)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirRelacaoLivroAutor = async function (livro_id, autor_id) {
    try {
        if (!livro_id || !autor_id || isNaN(livro_id) || isNaN(autor_id)) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        }

        let result = await livrosAutoresDAO.deleteRelacaoLivroAutor(livro_id, autor_id)
        return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_NOT_FOUND
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarRelacoes = async function () {
    try {
        let result = await livrosAutoresDAO.selectAllRelacoes()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                item: result.length,
                relacoes: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirRelacaoLivroAutor,
    excluirRelacaoLivroAutor,
    listarRelacoes
}
