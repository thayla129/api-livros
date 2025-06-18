/**
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de autores
 * Data: 18/06/2025
 * Autor:  Heloysa Vilela
 * Versão: 1.0
 */

const MESSAGE = require('../../modulo/config.js')
const autorDAO = require('../../model/dao/autores.js')

const inserirAutor = async function (autor, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!autor.nome || autor.nome.length > 255) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await autorDAO.insertAutor(autor)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAutor = async function (autor, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!autor.nome || autor.nome.length > 255 || !id || isNaN(id) || id <= 0) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let exists = await buscarAutor(id)
                if (exists.status_code === 200) {
                    autor.id = id
                    let result = await autorDAO.updateAutor(autor)
                    return result ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return exists
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirAutor = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let exists = await buscarAutor(id)
        if (exists.status_code === 200) {
            let result = await autorDAO.deleteAutor(id)
            return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return exists
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarAutores = async function () {
    try {
        let dados = {}
        let result = await autorDAO.selectAllAutores()

        if (result && result.length > 0) {
            dados.status = true
            dados.status_code = 200
            dados.item = result.length
            dados.autores = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarAutor = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let result = await autorDAO.selectByIdAutor(id)
        if (result && result.length > 0) {
            return { status: true, status_code: 200, autores: result }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirAutor,
    atualizarAutor,
    excluirAutor,
    listarAutores,
    buscarAutor
}
