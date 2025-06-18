const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGenero = async function (genero) {
    try {
        let sql = `INSERT INTO generos (nome)
                   VALUES ('${genero.nome}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const updateGenero = async function (genero) {
    try {
        let sql = `UPDATE generos SET nome = '${genero.nome}' WHERE id = ${genero.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const deleteGenero = async function (id) {
    try {
        let sql = `DELETE FROM generos WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const selectAllGeneros = async function () {
    try {
        let sql = `SELECT * FROM generos ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

const selectByIdGenero = async function (id) {
    try {
        let sql = `SELECT * FROM generos WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
}
