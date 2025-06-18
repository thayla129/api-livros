/**
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de gêneros
 * Data: 18/06/2025
 * Autor:  Heloysa Vilela
 * Versão: 1.0
 */

const MESSAGE = require('../../modulo/config.js')
const generoDAO = require('../../model/dao/generos.js')

const inserirGenero = async function (genero, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!genero.nome || genero.nome.length > 100) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await generoDAO.insertGenero(genero)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarGenero = async function (genero, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!genero.nome || genero.nome.length > 100 || !id || isNaN(id) || id <= 0) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let exists = await buscarGenero(id)
                if (exists.status_code === 200) {
                    genero.id = id
                    let result = await generoDAO.updateGenero(genero)
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

const excluirGenero = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let exists = await buscarGenero(id)
        if (exists.status_code === 200) {
            let result = await generoDAO.deleteGenero(id)
            return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return exists
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarGeneros = async function () {
    try {
        let result = await generoDAO.selectAllGeneros()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                item: result.length,
                generos: result
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarGenero = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let result = await generoDAO.selectByIdGenero(id)
        if (result && result.length > 0) {
            return { status: true, status_code: 200, generos: result }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGenero
}
