const { Sequelize, DataTypes, Op } = require('sequelize')
const conexaoComBancoDeDados = new Sequelize({
    dialect: 'sqlite',
    storage: 'Database.sqlite'
})

const Game = conexaoComBancoDeDados.define('Games', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    platforms: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
},)


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
},)

async function atualizarRatingJogo(gameId) {
    try {
        const avaliacoes = await TabelaAvaliacoes.findAll({
            where: { game_id: gameId }
        })

        if (avaliacoes.length === 0) {
            console.log("Nenhuma avaliação encontrada para o jogo.")
            return { mensagem: "Nenhuma avaliação encontrada para o jogo." }
        }

        const somaRatings = avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.rating, 0)
        const mediaRating = somaRatings / avaliacoes.length

        const jogo = await Game.findByPk(gameId)
        if (jogo) {
            await jogo.update({ rating: mediaRating })
            console.log("Rating atualizado com sucesso.")
            return {
                mensagem: "Rating atualizado com sucesso.",
                rating: mediaRating
            }
        } else {
            console.log("Jogo não encontrado.")
            return { mensagem: "Jogo não encontrado." }
        }
    } catch (error) {
        console.error("Erro ao atualizar o rating do jogo:", error)
        return { mensagem: "Erro ao atualizar o rating do jogo.", erro: error }
    }
}

module.exports = { atualizarRatingJogo }
