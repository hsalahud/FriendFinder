const fetch = window.fetch

//Variable to determine the lowest score among friends
let scoreDiff

//function that adds up all values in an array, will be used as a callback function the reduce method
const reducer = (accumulator, currentValue) => accumulator + currentValue

//Fetching our friends data
const getFriends = _ => {
  fetch('/friends')
    .then ( r => r.json())
    .then ( friends => {

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      //https://www.w3schools.com/jsref/jsref_map.asp
      //https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-in-javascript/45342187
      //We go over our objects and find the scores.
      for (let i = 0; i <= friends.length-2; i++){
        //we use the map function along with it's item and index parameters to subtract each value of two arrays. One array is the one we just submitted and the other is one of the friends
        scoreDiff = friends[friends.length-1].scores.map((item, index) => item - friends[i].scores[index])
        //We then use reduce and math.abs to sum the value of element in the array
        scoreDiff = Math.abs(scoreDiff.reduce(reducer))
        friends[i].scoreDiff = scoreDiff
      }
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      //Then we sort the array from least to greatest
      friends.sort((a, b) => {
        return a.scoreDiff - b.scoreDiff
      })

      //The first element in the array is the best match so we set it up to display in the modal
      document.querySelector('#bestName').innerHTML = friends[0].name
      document.querySelector('#bestImage').setAttribute('src', friends[0].image)
    })
    .catch (e => console.log(e))
}

//Add event listener to post the values we entered into the friends object of arrays
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
  }
})


// Note: I should use this instead of adding a new key to our data: https://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/


///Test code below for my own use.


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
