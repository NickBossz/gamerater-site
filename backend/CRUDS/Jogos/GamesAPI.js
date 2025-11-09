const {Sequelize, DataTypes} = require('sequelize')
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
})

async function sincronizarBancoDeDados() {
    try { 
        await conexaoComBancoDeDados.sync()
    } catch(e) {
        console.log('Ocorreu um erro ao sincronizar o banco de dados ' + e)
    }
}
sincronizarBancoDeDados()

async function coletarInformacaoJogo_API(gameName) {
    const apiKey = 'fb959016d9804fcf80fca4a2d9af3496'
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
            const game = data.results[0]
            const releaseYear = game.released ? game.released.split('-')[0] : null
            const platforms = game.platforms ? game.platforms.map(platform => platform.platform.name).join(", ") : null

            const gameInfo = {
                name: game.name,
                genre: game.genres.map(genre => genre.name).join(", "),
                year: releaseYear,
                imageUrl: game.background_image,
                platforms: platforms,
                rating: 0,
            }

            await Game.create(gameInfo)
            return gameInfo
        } else {
            console.log("Jogo não encontrado.")
            return null
        }
    } catch (error) {
        console.error("Erro ao buscar informações do jogo:", error)
        return null
    }
}

async function coletarJogos_API(limit = 5) {
    let games = []
    let offset = 0

    while (games.length < limit) {
        const url = `https://api.rawg.io/api/games?key=fb959016d9804fcf80fca4a2d9af3496&offset=${offset}`
        try {
            const response = await fetch(url)
            const data = await response.json()

            if (data.results && data.results.length > 0) {
                for (let game of data.results) {
                    const existingGame = await Game.findOne({ where: { name: game.name } })

                    if (!existingGame) {
                        const gameInfo = await coletarInformacaoJogo_API(game.name)
                        if (gameInfo) {
                            games.push(gameInfo)
                        }

                        if (games.length >= limit) {
                            break
                        }
                    }
                }
            }

            offset += 10

            if (games.length >= limit) {
                break
            }
        } catch (error) {
            console.error("Erro ao buscar jogos:", error)
            break
        }
    }

    return games
}

async function coletarJogoPorId_BancoDados(id) {
    try {
        const game = await Game.findByPk(id)
        if (game) {
            return game
        } else {
            console.log("Jogo não encontrado pelo ID.")
            return null
        }
    } catch (error) {
        console.error("Erro ao buscar jogo pelo ID:", error)
        return null
    }
}

async function atualizarInformacoes_BancoDados() {
    try {
        const games = await Game.findAll()
        for (let game of games) {
            const updatedGameInfo = await coletarInformacaoJogo_API(game.name)
            if (updatedGameInfo) {
                await game.update({
                    genre: updatedGameInfo.genre,
                    year: updatedGameInfo.year,
                    imageUrl: updatedGameInfo.imageUrl,
                    platforms: updatedGameInfo.platforms,
                })
            }
        }
        console.log("Informações dos jogos atualizadas com sucesso!")
    } catch (error) {
        console.error("Erro ao atualizar as informações dos jogos:", error)
    }
}

async function coletarJogos_BancoDados() {
    try {
        const games = await Game.findAll()
        return games
    } catch (error) {
        console.error("Erro ao carregar dados do banco de dados:", error)
    }
}

// coletarJogos_API(700)

module.exports = {
    coletarInformacaoJogo_API,
    coletarJogos_API,
    atualizarInformacoes_BancoDados,
    coletarJogos_BancoDados,
    coletarJogoPorId_BancoDados,
}
