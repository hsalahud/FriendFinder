//setting up server
const express = require('express')
const app = express()
const { join } = require('path')

//declaring middleware
//note, the below only works if my html file is named index.html
//refer to: http://www.senchalabs.org/connect/static.html
//and
//https://stackoverflow.com/questions/13339695/nodejs-w-express-error-cannot-get
app.use(express.static(join(__dirname, '/app/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//bringing in data api
const routesAPI = require('./app/routing/apiRoutes.js')
// const routesHTML = require('./app/routing/htmlRoutes.js')

routesAPI(app)
// routesHTML(app)

//listening on port 3000 else on whatever heroku decides
app.listen(process.env.PORT || 3000)


//Note: js file linked to html is not found when I use html routes