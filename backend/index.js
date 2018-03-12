const express = require('express')
const app = express()
var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const bodyParser = require('body-parser')

app.listen(4002, () => console.log('Express API listening on port 4002'))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

const Square = sequelize.define('square', {
  rowindex: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  colindex: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
},
  {tableName: 'ssquares',
    timestampe: false
})

Square.findById(1).then(square => console.log(JSON.stringify(square)))



app.post('/squares', (req, res) => {
  const square = {
    rowIndex: req.body.rowindex,
    colIndex: req.body.colindex,
    value: req.body.value,
  }

  Square.create(square)
  .then(entity => {
    res.json({
      id: entity.id,
      rowIndex: entity.rowindex,
      colIndex: entity.colindex,
      value: entity.value,
    })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({
      message: 'Something went wrong'
    })
  })
})
