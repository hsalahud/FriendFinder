//bringing in friends data
let friends = require('../data/friends.js')

module.exports = app => {

  //GET all friends
  app.get('/friends', (req, res) => {
    res.json(friends)
  })

  //POST survey response
  app.post('/friends', (req, res) => {
    let newFriend = req.body
    friends.push(newFriend)
    res.send("success!")
  })
}