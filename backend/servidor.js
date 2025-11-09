const express = require('express')
const cors = require('cors')
const servidorBackend = express()

const portaServidorBackend = 8080

const {coletarInformacaoJogo_API, coletarJogos_API, atualizarInformacoes_BancoDados, coletarJogos_BancoDados, coletarJogoPorId_BancoDados} = require("./CRUDS/Jogos/GamesAPI.js")
const {criarAvaliacao, coletarAvaliacoes, coletarAvaliacaoPeloID, excluirAvaliacao, coletarDadosDeAvaliacaoFeita, editarAvaliacao} = require("./CRUDS/Avaliacoes/CrudAvaliacoes.js")
const {criarUsuario, coletarUsuarioPeloNome, excluirUsuario, uploadPerfilImage, coletarUsuarios} = require("./CRUDS/Usuarios/CrudUsuarios.js")
const {criarAnalise, coletarAnalises, coletarAnalisePeloID, excluirAnalise, editarAnalise, coletarAnalisesDe} = require("./CRUDS/Analises/CrudAnalises.js")


const {atualizarRatingJogo} = require("./CRUDS/Jogos/UpdateRating.js")
servidorBackend.use(express.json({ limit: '50mb' }))
servidorBackend.use(express.urlencoded({ extended: true, limit: '50mb' }))
servidorBackend.use(cors({
    origin: '*',
    allowedHeaders: '*'
}))

servidorBackend.listen(portaServidorBackend,() => console.log(`servidor backend rodando em http://localhost:${portaServidorBackend}`))

// --------------- JOGOS ---------------
servidorBackend.get('/jogos', async (requisicao, resposta) => {
    const dados = await coletarJogos_BancoDados()
    resposta.status(200).json(dados)
})

servidorBackend.get('/jogo/:id', async(requisicao, resposta) =>{
    const { id  } = requisicao.params
    const dados = await coletarJogoPorId_BancoDados(id)
    resposta.status(200).json(dados)
})




// ------------- AVALIACÕES -------------
servidorBackend.post("/avaliar/:id", async(requisicao, resposta) => {
    const dados = requisicao.body
    const avaliacao = await criarAvaliacao(dados)
    atualizarRatingJogo(dados.game_id)
    resposta.status(200).json(avaliacao)
})

servidorBackend.get('/avaliacoes/:username', async(requisicao, resposta) =>{
    const { username  } = requisicao.params
    const dados = await coletarDadosDeAvaliacaoFeita(username)
    resposta.status(200).json(dados)
})

servidorBackend.put('/avaliacoes/:id', async (req, res) => {
    const { id } = req.params
    const novosDados = req.body
    const resultado = await editarAvaliacao(id, novosDados.media_rating)
    atualizarRatingJogo(novosDados.game_id)
    res.json(resultado)
})



// -------------- USUARIOS --------------
servidorBackend.post('/criarUsuario', async (req, res) => {
    const dados = req.body
    const usuario = await criarUsuario(dados)
    res.status(200).json(usuario)
})

servidorBackend.get('/usuario/:username', async (req, res) => {
    const { username } = req.params
    const usuario = await coletarUsuarioPeloNome(username)
    res.status(200).json(usuario)
})

servidorBackend.get('/usuarios', async (req, res) => {
    const usuarios = await coletarUsuarios()
    res.status(200).json(usuarios)
})


servidorBackend.delete('/excluirUsuario/:username', async (req, res) => {
    const { username } = req.params
    const deletar = await excluirUsuario(username) 
    res.status(200).json(deletar)
})

servidorBackend.post('/uploadperfilimage', async (req, res) => {
    const novosDados = req.body
    console.log(novosDados)
    const resultado = await uploadPerfilImage(novosDados)
    res.json(resultado)
})


// -------------- ANALISES --------------
servidorBackend.get('/analises', async (req, res) => {
    const analises = await coletarAnalises()
    res.status(200).json(analises)
})

servidorBackend.get('/analisesDe/:username', async (req, res) => {
    const { username } = req.params
    const analises = await coletarAnalisesDe(username)
    res.status(200).json(analises)
})

servidorBackend.get('/analise/:id', async (req, res) => {
    const { id } = req.params
    const analise = await coletarAnalisePeloID(id)
    res.status(200).json(analise)
})

servidorBackend.post('/criarAnalise', async (req, res) => {
    const dados = req.body
    const analises = await criarAnalise(dados)
    res.status(200).json(analises)
})