/**
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de editoras
 * Data: 18/06/2025
 * Autor:  Heloysa Vilela
 * Versão: 1.0
 */

const MESSAGE = require('../../modulo/config.js')
const editoraDAO = require('../../model/dao/editoras.js')

const inserirEditora = async function (editora, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!editora.nome || editora.nome.length > 255 || !editora.pais || editora.pais.length > 100) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await editoraDAO.insertEditora(editora)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEditora = async function (editora, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!editora.nome || editora.nome.length > 255 || !editora.pais || editora.pais.length > 100 || !id || isNaN(id) || id <= 0) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let exists = await buscarEditora(id)
                if (exists.status_code === 200) {
                    editora.id = id
                    let result = await editoraDAO.updateEditora(editora)
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

const excluirEditora = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let exists = await buscarEditora(id)
        if (exists.status_code === 200) {
            let result = await editoraDAO.deleteEditora(id)
            return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return exists
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarEditoras = async function () {
    try {
        let dados = {}
        let result = await editoraDAO.selectAllEditoras()

        if (result && result.length > 0) {
            dados.status = true
            dados.status_code = 200
            dados.item = result.length
            dados.editoras = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarEditora = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) return MESSAGE.ERROR_REQUIRE_FIELDS

        let result = await editoraDAO.selectByIdEditora(id)
        if (result && result.length > 0) {
            return { status: true, status_code: 200, editoras: result }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirEditora,
    atualizarEditora,
    excluirEditora,
    listarEditoras,
    buscarEditora
}
