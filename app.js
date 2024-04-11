//Ex1
const express = require ("express")
const path = require('path')

const app = express()
const port = 3000

const users = []

app.use(express.json())

//Ex2
app.get('/sobre', (req, res) => {
    res.send("Esta é a página sobre do aplicativo")
})

app.get('/contato', (req, res) => {
    res.send("Telefone para contato: (48)33333333")
})

//Ex3
const registroMiddleware = (req, res, next) => {
    const horaAtual = new Date().toISOString() //converter formato de data
    console.log(`Registro criado em ${horaAtual}: método ${req.method} em ${req.originalUrl}`)
    next();
}

app.use(registroMiddleware) //use: para ser aplicado no código inteiro

//Ex4
app.get('/produto/:id', (req, res) => {
    const {id} = req.params //parâmetro requisitado
    res.send(`O produto de id ${id} foi encontrado.`)
})

//Ex5 
const dirEstatico = path.join(__dirname, 'public')

app.use(express.static(dirEstatico))

//Ex6 
app.post('/users', (req, res) => {
    const {nome, email, telefone} = req.body  
    const usuario = {nome, email, telefone}
    usuario.id = users.length > 0 ? users[users.length -1].id + 1 : 1  
    users.push(usuario)
    const novoUsuario ={
        "Usuário criado:": usuario,
    }
    res.status(201).json(novoUsuario)
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    const usuario = users.find(usuario => usuario.id === parseInt(id))
    if (!usuario) {
        res.status(404).send("Usuário não encontrado")
        return
    } 
    res.json(usuario)
})

app.put('/users/:id', (req, res) => {
    const {id} = req.params
    const atualizaDados = req.body 
    const index = users.findIndex(usuario => usuario.id === parseInt(id))
    if (index === -1){ //index === -1:  se nenhum elemento for encontrado
        res.status(404).send("Usuário não encontrado")
        return
    }
    users[index] = {...users[index], ...atualizaDados}
    res.status(200).json(users[index])
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const index = users.findIndex(usuario => usuario.id === parseInt(id))
    if (index === -1){ //index === -1: lista vazia
        res.status(404).send("Usuario não encontrado")
        return
    }
    const usuarioRemovido = users.splice(index, 1)[0]
    res.status(200).send("Usuário deletado")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
