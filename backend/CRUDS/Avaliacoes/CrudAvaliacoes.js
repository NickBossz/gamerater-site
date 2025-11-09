
const {Sequelize, DataTypes} = require('sequelize')
const { coletarJogoPorId_BancoDados } = require('../Jogos/GamesAPI')
const conexaoComBancoDeDados = new Sequelize({
    dialect: 'sqlite',
    storage: 'Database.sqlite'
})

const TabelaAvaliacoes = conexaoComBancoDeDados.define('Ratings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rating: {
        type: DataTypes.TINYINT.UNSIGNED,
        validate: {
            min: 0,
            max: 10,
        }
    }
})

async function sincronizarBancoDeDados() {
    try { 
        await conexaoComBancoDeDados.sync()
    } catch(e) {
        console.log('Ocorreu um erro ao sincronizar o banco de dados ' + e)
    }
}
sincronizarBancoDeDados()



async function criarAvaliacao(dados) {
    try {
        const avaliacaoExistente = await TabelaAvaliacoes.findOne({
            where: {
                game_id: dados.game_id,
                username: dados.username
            }
        })

        if (avaliacaoExistente) {
            console.log("O usuário já avaliou este jogo.")
            return {
                dados: avaliacaoExistente,
                mensagem: "O usuário já avaliou este jogo."
            }
        }

        const avaliacaoCadastrada = await TabelaAvaliacoes.create(dados)
        
        console.log("Avaliação cadastrada com sucesso.")
        return {
            dados: avaliacaoCadastrada,
            mensagem: "Avaliação cadastrada com sucesso."
        }
    } catch (e) {
        console.log("Erro ao criar avaliação: " + e)
        return {
            dados: e,
            mensagem: "Erro ao criar avaliaçao."
        }
    }
}

async function coletarAvaliacoes() {

    try {
        const dados = await TabelaAvaliacoes.findAll()

        return {
            dados: dados,
            mensagem: "Sucesso em coletar avaliações."
        }
    } catch(err){
        console.error('Erro ao coletar avaliações:', err)
        return {
            dados: err,
            mensagem: "Erro ao coletar avaliações."
        }
    }

}

async function coletarAvaliacaoPeloID(id) {
    
    try {
        const avaliacao = await TabelaAvaliacoes.findByPk(id)
        return {
            dados: avaliacao,
            mensagem: "Sucesso em coletar avaliação pelo ID."
        }
    } catch (err) {
        console.error('Erro ao coletar avaliação pelo ID:', err)
        return {
            dados: err,
            mensagem: "Erro ao coletar avaliação pelo ID"
        }
    }

}

async function excluirAvaliacao(id) {
    try {
        const deletar = TabelaAvaliacoes.destroy({
            where: {id: id}
        })

        console.log('Avaliação removida com sucesso.')
        return {
            dados: deletar,
            mensagem: "Avaliação removida com sucesso."
        }
    } catch (err) {
        console.log("Erro ao remover avaliação: " + err)
        return {
            dados: err,
            mensagem: "Erro ao remover avaliacão."
        }
    }
} 

async function coletarDadosDeAvaliacaoFeita(username){

    try {
        const avaliacoes = await TabelaAvaliacoes.findAll({
            where: { username: username }
        })
        
        const avaliacoesFormatadas = await Promise.all(
            avaliacoes.map(async avaliacao => {
                const jogo = await coletarJogoPorId_BancoDados(avaliacao.game_id)
                return {
                    id: avaliacao.id,
                    game_id: avaliacao.game_id,
                    rating: avaliacao.rating,
                    imageUrl: jogo.imageUrl,
                    name: jogo.name
                }
            })
        )
        

        return {
            dados: avaliacoesFormatadas,
            mensagem: "Coletado com sucesso!"
        }
    } catch (error) {
        console.error("Erro ao buscar avaliações:", error)
        
        return {
            dados: error,
            mensagem: "Erro ao buscar avaliações."
        }
    }
}

async function editarAvaliacao(id, novosDados) {

    try {
        const avaliacao = await TabelaAvaliacoes.findByPk(id)
        if (!avaliacao) {
            return { mensagem: "Avaliação não encontrada." }
        }

        await avaliacao.update({
            rating: novosDados
        })

        return {
            dados: avaliacao,
            mensagem: "Avaliação atualizada com sucesso!"
        }
    } catch (error) {
        console.error("Erro ao atualizar avaliação:", error)
        return {
            dados: error,
            mensagem: "Erro ao atualizar avaliação."
        }
    }
}


module.exports = {
    criarAvaliacao,
    coletarAvaliacoes,
    coletarAvaliacaoPeloID,
    excluirAvaliacao,
    coletarDadosDeAvaliacaoFeita,
    editarAvaliacao
}