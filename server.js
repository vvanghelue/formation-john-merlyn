const express = require("express")
const mysql = require('mysql2');
const app = express()

app.use(express.json())
app.use(express.static(__dirname + "/public"))


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hotlist-dev'
});

app.get('/api/hello_world', function (req, res, next) {
    res.json({
        hello: 'world'
    })
})

app.get('/api/get_user/:id', async function (req, res, next) {
    const userId = req.params.id
    // console.log(`I want the user ${userId}`)
    connection.execute(
        `SELECT * FROM user WHERE id = ? AND active = ?`,
        [req.params.id, 1],
        function(err, results, fields) {
            if (results[0]) {
                res.json(results[0])
                return
            }
            res.json('User not found')
        }
    )
})

const port = process.env.PORT || 5000
app.listen(port)
console.log(`Listening to port : ${port}`)