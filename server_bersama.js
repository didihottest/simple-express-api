const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/product/:product_id/:status', function (req, res) {
  res.json({
    product_id: req.params.product_id,
    status: req.params.status
  })
})

app.get('/', (req, res) => {
  const { id, status } = req.query
  // bentuk pendek
  // const id = req.query.id
  // const status = req.query.status
  res.json({
    id, // id:id
    status // status:status
  })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})


app.get('/avinska/:username/:tweetId', (req, res) => {
  res.json({
    username: req.params.username,
    tweetId: req.params.tweetId,
  })
})

app.get('/aliffadel/:username/:password', (req, res) => {
  res.json({
    username: req.params.username,
    password: req.params.password
  })
})


app.get('/rizky/:machine_id/:machine_name', function (req, res) {
  res.json({
    machine_id: req.params.machine_id,
    machine_name: req.params.machine_name,
  })
})






app.get('/harman/:id_barang/:nama_barang/:status', (req, res) => {
  const { id_barang, nama_barang, status } = req.params
  res.json({
    id_barang, nama_barang
    , status
  })
})



app.post('/ninda/:username/:gender', (req, res) => {
  res.json({
    username: req.params.username,
    gender: req.params.gender
  })
})


app.get('/juand', (req, res) => {
  const { id, penyanyi, album, genre } = req.query;
  res.json({
    id,
    penyanyi,
    album,
    genre
  })
})

app.get('/alifiandyn/:nim/:status_mhs', function (req, res) {
  res.json({
    nim: req.params.nim,
    status_mhs: req.params.status_mhs
  })
})

// app.get('/alifiandyn/:nim/:status_mhs', function (req, res) {
//   const { nim, status_mhs } = req.params
//   res.json({ nim, status_mhs })
// })

app.get('/zulfikar/:book_tittle/:status_book', function (req, res) {
  res.json({
    book_tittle: req.params.book_tittle,
    status_book: req.params.status_book
  })
})
const PORT = 3000

app.listen(3000, () => {
  console.log("Server Berjalan Pada Port " + PORT)
})

