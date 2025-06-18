const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertLivro = async function (livro) {
    try {
        let sql = `INSERT INTO livros (titulo, isbn, ano_publicacao, numero_paginas, editora_id, genero_id)
                   VALUES ('${livro.titulo}', '${livro.isbn}', '${livro.ano_publicacao}', '${livro.numero_paginas}', '${livro.editora_id}', '${livro.genero_id}')`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateLivro = async function (livro) {
    try {
        let sql = `UPDATE livros SET 
                        titulo = '${livro.titulo}', 
                        isbn = '${livro.isbn}', 
                        ano_publicacao = '${livro.ano_publicacao}', 
                        numero_paginas = '${livro.numero_paginas}',
                        editora_id = '${livro.editora_id}',
                        genero_id = '${livro.genero_id}'
                    WHERE id = ${livro.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteLivro = async function (id) {
    try {
        let sql = `DELETE FROM livros WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllLivro = async function () {
    try {
        let sql = 'SELECT * FROM livros ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdLivro = async function (id) {
    try {
        let sql = `SELECT * FROM livros WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertLivro,
    updateLivro,
    deleteLivro,
    selectAllLivro,
    selectByIdLivro
}
