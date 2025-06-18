const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertEditora = async function (editora) {
    try {
        let sql = `INSERT INTO editoras (nome, pais)
                   VALUES ('${editora.nome}', '${editora.pais}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const updateEditora = async function (editora) {
    try {
        let sql = `UPDATE editoras SET 
                    nome = '${editora.nome}', 
                    pais = '${editora.pais}' 
                   WHERE id = ${editora.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const deleteEditora = async function (id) {
    try {
        let sql = `DELETE FROM editoras WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const selectAllEditoras = async function () {
    try {
        let sql = 'SELECT * FROM editoras ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

const selectByIdEditora = async function (id) {
    try {
        let sql = `SELECT * FROM editoras WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

module.exports = {
    insertEditora,
    updateEditora,
    deleteEditora,
    selectAllEditoras,
    selectByIdEditora
}
