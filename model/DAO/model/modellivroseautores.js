const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertRelacaoLivroAutor = async function (relacao) {
    try {
        let sql = `INSERT INTO livros_autores (livro_id, autor_id)
                   VALUES (${relacao.livro_id}, ${relacao.autor_id})`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const deleteRelacaoLivroAutor = async function (livro_id, autor_id) {
    try {
        let sql = `DELETE FROM livros_autores 
                   WHERE livro_id = ${livro_id} AND autor_id = ${autor_id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch {
        return false
    }
}

const selectAllRelacoes = async function () {
    try {
        let sql = `SELECT * FROM livros_autores`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch {
        return false
    }
}

module.exports = {
    insertRelacaoLivroAutor,
    deleteRelacaoLivroAutor,
    selectAllRelacoes
}
