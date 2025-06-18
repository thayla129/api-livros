const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAutor = async function (autor) {
    try {
        let sql = `INSERT INTO autores (nome, nacionalidade, data_nascimento)
                   VALUES ('${autor.nome}', '${autor.nacionalidade}', '${autor.data_nascimento}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const updateAutor = async function (autor) {
    try {
        let sql = `UPDATE autores SET 
                    nome = '${autor.nome}', 
                    nacionalidade = '${autor.nacionalidade}', 
                    data_nascimento = '${autor.data_nascimento}' 
                   WHERE id = ${autor.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const deleteAutor = async function (id) {
    try {
        let sql = `DELETE FROM autores WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const selectAllAutores = async function () {
    try {
        let sql = 'SELECT * FROM autores ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

const selectByIdAutor = async function (id) {
    try {
        let sql = `SELECT * FROM autores WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

module.exports = {
    insertAutor,
    updateAutor,
    deleteAutor,
    selectAllAutores,
    selectByIdAutor
}
