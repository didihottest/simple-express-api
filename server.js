const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/api/products', (req, res) => {
  let readProductJson = fs.readFileSync('./data/products.json', 'utf-8')
  const data = JSON.parse(readProductJson)
  res.status(200).json({
    data // dataLdata
  })
})


app.get('/api/product', (req, res) => {
  const { id } = req.query
  if (!id) {
    res.status(400).json({
      message: "Please Input Product ID"
    })
  } else {
    let readProductJson = fs.readFileSync('./data/products.json', 'utf-8')
    const data = JSON.parse(readProductJson)
    const productFound = data.find((item) => item.id == id)

    if (!productFound) {
      res.status(404).json({
        message: "Product Not Found"
      })
    } else {
      res.status(200).json({
        message: "SUCCESS",
        data: productFound
      })
    }
  }
})

app.post('/api/product', (req, res) => {
  const { name, description, price } = req.body
  if (!name) {
    res.status(400).json({
      message: "Please Input Product Name"
    })
  } else if (!description) {
    res.status(400).json({
      message: "Please Input Product Description"
    })
  } else if (!price) {
    res.status(400).json({
      message: "Please Input Product Price"
    })
  } else {

    let readProductJson = fs.readFileSync('./data/products.json', 'utf-8')
    const data = JSON.parse(readProductJson)

    const newProduct = {
      id: (Number(data.length) + 1).toString(),
      name, // name: name
      description, // description: description
      price,  // price: price
    }

    data.push(newProduct)
    fs.writeFileSync('./data/products.json', JSON.stringify(data, null, 4))

    res.status(201).json({
      message: "Product Successfully Created"
    })

  }
})

app.put('/api/product/:id', (req, res) => {
  const { id } = req.params

  const { name, description, price } = req.body

  if (!id) {
    res.status(400).json({
      message: "Please Input Product ID"
    })
  } else {
    let readProductJson = fs.readFileSync('./data/products.json', 'utf-8')
    const data = JSON.parse(readProductJson)
    const productFound = data.find((item) => item.id == id)

    if (!productFound) {
      res.status(404).json({
        message: "Product Not Found"
      })
    } else {
      const updateProduct = {
        id: productFound.id,
        name: name ?? productFound.name,
        description: description ?? productFound.description,
        price: price ? Number(price) : Number(productFound.price)
      }

      const updateProductIndex = data.findIndex((item) => item.id == id)
      console.log(updateProductIndex)
      data[updateProductIndex] = updateProduct
      fs.writeFileSync('./data/products.json', JSON.stringify(data, null, 4))

      res.status(200).json({
        message: "Product Successfully Updated"
      })
    }
  }
})

app.delete('/api/product/:id', (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).json({
      message: "Please Input Product ID"
    })
  } else {
    let readProductJson = fs.readFileSync('./data/products.json', 'utf-8')
    const data = JSON.parse(readProductJson)
    const productFound = data.find((item) => item.id == id)

    if (!productFound) {
      res.status(404).json({
        message: "Product Not Found"
      })
    } else {

      const deletedProductList = data.filter((item) => item.id != id)
      // console.log(deletedProductList);

      fs.writeFileSync('./data/products.json', JSON.stringify(deletedProductList, null, 4))

      res.status(200).json({
        message: "Product Successfully Deleted"
      })
    }
  }
})


const PORT = 3000

app.listen(3000, () => {
  console.log("Server Berjalan Pada Port " + PORT)
})

