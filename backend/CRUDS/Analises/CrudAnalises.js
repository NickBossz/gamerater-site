const {Sequelize, DataTypes} = require('sequelize')
const { coletarJogoPorId_BancoDados } = require('../Jogos/GamesAPI')
const conexaoComBancoDeDados = new Sequelize({
    dialect: 'sqlite',
    storage: 'Database.sqlite'
})

const TabelaAnalises = conexaoComBancoDeDados.define('Reviews', {
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
    review: {
        type: DataTypes.STRING,
        allowNull: false
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



async function criarAnalise(dados) {
    try {
        const analiseExistente = await TabelaAnalises.findOne({
            where: {
                game_id: dados.game_id,
                username: dados.username
            }
        });

        if (analiseExistente) {
            console.log("O usuário já criou uma análise para este jogo.");
            return {
                dados: analiseExistente,
                mensagem: "O usuário já criou uma análise para este jogo."
            };
        }

        const analiseCadastrada = await TabelaAnalises.create(dados);
        
        console.log("Análise cadastrada com sucesso.");
        return {
            dados: analiseCadastrada,
            mensagem: "Análise cadastrada com sucesso."
        };
    } catch (e) {
        console.log("Erro ao criar análise: " + e);
        return {
            dados: e,
            mensagem: "Erro ao criar análise."
        }
    }
}

async function coletarAnalises() {

    try {
        const dados = await TabelaAnalises.findAll()

        const dadosFormatados = await Promise.all(
            dados.map(async review => {
                const jogo = await coletarJogoPorId_BancoDados(review.game_id)
                return {
                    id: review.id,
                    game_id: review.game_id,
                    review: review.review,
                    imageUrl: jogo.imageUrl,
                    name: jogo.name,
                    username: review.username
                }
            })
        )


        return {
            dados: dadosFormatados,
            mensagem: "Sucesso em coletar análises."
        }
    } catch(err){
        console.error('Erro ao coletar análises:', err);
        return {
            dados: err,
            mensagem: "Erro ao coletar análises."
        }
    }

}

async function coletarAnalisePeloID(id) {
    
    try {
        const review = await TabelaAnalises.findByPk(id)
        const jogo = await coletarJogoPorId_BancoDados(review.game_id)

        const dados = {
            id: review.id,
            game_id: review.game_id,
            review: review.review,
            imageUrl: jogo.imageUrl,
            name: jogo.name,
            username: review.username
        }


        return {
            dados: dados,
            mensagem: "Sucesso em coletar análise pelo ID."
        }
    } catch (err) {
        console.error('Erro ao coletar análise pelo ID:', err);
        return {
            dados: err,
            mensagem: "Erro ao coletar análise pelo ID"
        }
    }

}

async function excluirAnalise(id) {
    try {
        const deletar = TabelaAnalises.destroy({
            where: {id: id}
        })

        console.log('Análise removida com sucesso.')
        return {
            dados: deletar,
            mensagem: "Análise removida com sucesso."
        }
    } catch (err) {
        console.log("Erro ao remover análise: " + err)
        return {
            dados: err,
            mensagem: "Erro ao remover análise."
        }
    }
} 

async function editarAnalise(id, novosDados) {

    try {
        const analise = await TabelaAvaliacoes.findByPk(id);
        if (!analise) {
            return { mensagem: "Análise não encontrada." };
        }

        await analise.update({
            review: novosDados
        });

        return {
            dados: analise,
            mensagem: "Análise atualizada com sucesso!"
        };
    } catch (error) {
        console.error("Erro ao atualizar análise:", error);
        return {
            dados: error,
            mensagem: "Erro ao atualizar análise."
        };
    }
}

async function coletarAnalisesDe(username) {
    try {
        const reviews = await TabelaAnalises.findAll({
            where: { username: username }
        })


        
        const reviewsFormatados = await Promise.all(
            reviews.map(async review => {
                const jogo = await coletarJogoPorId_BancoDados(review.game_id)
                return {
                    id: review.id,
                    game_id: review.game_id,
                    review: review.review,
                    imageUrl: jogo.imageUrl,
                    name: jogo.name,
                    username: review.username
                }
            })
        )


        return {
            dados: reviewsFormatados,
            mensagem: "Sucesso em coletar análise pelo ID."
        }
    } catch (err) {
        console.error('Erro ao coletar análise pelo ID:', err);
        return {
            dados: err,
            mensagem: "Erro ao coletar análise pelo ID"
        }
    }
}

module.exports = {
    criarAnalise,
    coletarAnalises,
    coletarAnalisePeloID,
    excluirAnalise,
    editarAnalise,
    coletarAnalisesDe
};