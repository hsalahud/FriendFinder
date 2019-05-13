const fetch = window.fetch

let submission = {}
let selectedChoices = []
let scoreDiff

const reducer = (accumulator, currentValue) => accumulator + currentValue

const getFriends = _ => {
  fetch('/friends')
    .then ( r => r.json())
    .then ( friends => {

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      //https://www.w3schools.com/jsref/jsref_map.asp
      //https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-in-javascript/45342187
      for (let i = 0; i <= friends.length-2; i++){
        scoreDiff = friends[friends.length-1].scores.map((item, index) => item - friends[i].scores[index])
        scoreDiff = Math.abs(scoreDiff.reduce(reducer))
        friends[i].scoreDiff = scoreDiff
      }
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      friends.sort((a, b) => {
        return a.scoreDiff - b.scoreDiff
      })
      console.log(friends[0])

      document.querySelector('#bestName').innerHTML = friends[0].name
      document.querySelector('#bestImage').setAttribute('src', friends[0].image)
    })
    .catch (e => console.log(e))
}

// getFriends()

document.addEventListener('click', e => {

  if (e.target.id === 'submit') {
    e.preventDefault()

    let a1 = parseInt(document.querySelector('#q1').value)
    let a2 = parseInt(document.querySelector('#q2').value)
    let a3 = parseInt(document.querySelector('#q3').value)
    let a4 = parseInt(document.querySelector('#q4').value)
    let a5 = parseInt(document.querySelector('#q5').value)
    let a6 = parseInt(document.querySelector('#q6').value)
    let a7 = parseInt(document.querySelector('#q7').value)
    let a8 = parseInt(document.querySelector('#q8').value)
    let a9 = parseInt(document.querySelector('#q9').value)
    let a10 = parseInt(document.querySelector('#q10').value)

    fetch ('/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify({
        name: document.querySelector('#name').value,
        image: document.querySelector('#profileLink').value,
        scores: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]
      })

    })
      .then ( r => {
        getFriends()

      })
      .catch (e => console.error(e))


    submission.name = document.querySelector('#name').value
    submission.image = document.querySelector('#profileLink').value
    

    selectedChoices.push(a1)
    selectedChoices.push(a2)
    selectedChoices.push(a3)
    selectedChoices.push(a4)
    selectedChoices.push(a5)
    selectedChoices.push(a6)
    selectedChoices.push(a7)
    selectedChoices.push(a8)
    selectedChoices.push(a9)
    selectedChoices.push(a10)

    submission.scores = selectedChoices


    
  }


})






// New friend will be the last in the array
// create a variable to store the values for each friend
// get the lowest score. 

// let friends = [
//   {
//     score: [1, 2, 5, 2]
//   },
//   {
//     score: [5, 2, 9, 3]
//   },
//   {
//     score: [7, 5, 1, 7]
//   },
// ]


// const friendScoreArray = []

// const closestFriend = () => {
//   let newFriendScore = friends[friends.length - 1].score;
  
//   for (let i = 0; i < friends.length - 1; i++) {
//     let friendScore = newFriendScore.map((value, index) => {
//       let singleScore = friends[i].score[index];
//       return Math.abs(value - singleScore);
//     }).reduce((acc, currentValue) => {
//       return acc + currentValue;
//     });

//     const friend = {
//       ...friends[i],
//       level: friendScore,
//     };

//     friendScoreArray.push(friend);
//   } 

//   return friendScoreArray.sort((a, b) => {
//     return a.level - b.level;
//   });
// }

// closestFriend();

// console.log(friendScoreArray);

/**
 * ANOTHER WAY
 * Without Sorting. It will always return one value.
 */

// let friends = [
//   {
//     score: [1, 2, 5, 2]
//   },
//   {
//     score: [5, 2, 9, 3]
//   },
//   {
//     score: [7, 5, 1, 7]
//   },
// ]


// const friendScoreArray = []

// const closestFriend = () => {
//   let newFriendScore = friends[friends.length - 1].score;
  
//   for (let i = 0; i < friends.length - 1; i++) {
//     let friendScore = newFriendScore.map((value, index) => {
//       let singleScore = friends[i].score[index];
//       return Math.abs(value - singleScore);
//     }).reduce((acc, currentValue) => {
//       return acc + currentValue;
//     });

//     const friend = {
//       ...friends[i],
//       level: friendScore,
//     };

//     if (friendScoreArray.length < 1) {
//       friendScoreArray.push(friend);
//     } else if (friendScore < friendScoreArray[0].level) {
//       friendScoreArray[0] = friend;
//     }
//   }
// }

// closestFriend();

// console.log(friendScoreArray);
