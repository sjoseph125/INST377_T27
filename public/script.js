/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// const api=0e31f29705fa26f604e00f070aea5e11
const state = 'AR';
const api_url = 'http://www.opensecrets.org/api/?method=getLegislators&id=AR&output=json&apikey=0e31f29705fa26f604e00f070aea5e11';
const leg = [];
async function getData() {
  const responce = await fetch(api_url);
  const data = await responce.json();
  // leg.push(data)
  leg.push(data.response.legislator[0]['@attributes'].firstlast);
  // return leg
  console.log(leg[0]);
}

getData();
console.log(leg);
console.log(leg[0]);






//   .then(rep => rep.json())

// console.log(leg)

// const restaurants = [];
// fetch('/api', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then((fromServer) => fromServer.json())

//   .then((jsonFromServer) => restaurants.push(...jsonFromServer))
// console.log(restaurants)
//   .catch((err) => {
//     console.log(err);

//   });
