// // let p = new Promise((resolve, reject) => {
// //   let a = 1 + 1
// //   if (a == 2) {
// //     resolve('Success')
// //   } else {
// //     reject('Fail')
// //   }
// // })

// // p.then((message) => {
// //   console.log('This is in then ' + message)
// // }).catch((message) => {
// //   console.log('This is in catch ' + message)
// // })


// // const watchTutorialCallBack = (callback, errorCallback) => {
// //   if (userLeft) {
// //     errorCallback({
// //       name: 'User Left',
// //       message: ':('
// //     })
// //   } else if (userWatchingCatchMeme) {
// //     errorCallback({
// //       name: 'User Watching Cat Meme',
// //       message: 'Hello'
// //     })
// //   } else {
// //     callback('Thumbs up ')
// //   }
// // }

// // watchTutorialCallBack((message) => {
// //   console.log('Success: ' + message)
// // }, (error) => {
// //   console.log(error.name + ' ' + error.message)
// // })

// const userLeft = false
// const userWatchingCatchMeme = true

// const watchTutorialPromise = () => {
//   return new Promise((resolve, reject) => {
//     if (userLeft) {
//       reject({
//         name: 'User Left',
//         message: ':('
//       })
//     } else if (userWatchingCatchMeme) {
//       reject({
//         name: 'User Watching Cat Meme',
//         message: 'Hello'
//       })
//     } else {
//       resolve('Thumbs up ')
//     }

//   })
// }

// watchTutorialPromise().then((message) => {
//   console.log('Success: ' + message)
// }).catch((error) => {
//   console.log(error.name + ' ' + error.message)
// })

// const recordVideoOne = new Promise((resolve, reject) => {
//   resolve('Video 1 Recorded')
// })

// const recordVideoTwo = new Promise((resolve, reject) => {
//   resolve('Video 2 Recorded')
// })

// const recordVideoThree = new Promise((resolve, reject) => {
//   resolve('Video 3 Recorded')
// })

// Promise.race([
//   recordVideoOne,
//   recordVideoTwo,
//   recordVideoThree
// ]).then((message) => {
//   console.log(message)
// }).catch((error) => {
//   console.log('Nooooooooo')
// })

console.log(2+3+"7")
console.log(typeof(2+3+"7"))

w