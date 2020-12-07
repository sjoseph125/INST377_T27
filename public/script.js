/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

let cid_name = [];
let org_total = [];
let ind_Total = [];
const leg_names = [];
let numLegs;
let counter;
let rep;
const Samsons_key = '0e31f29705fa26f604e00f070aea5e11';
const Jooyongs_key = '165cf0bdb1b94281cb53560f4b66d567';

const selection = document.querySelector('.l_select');
const tc_results = document.querySelector('.tc_results');
const l_select = document.querySelector('.l_select');
const ic_results = document.querySelector('.ic_results');
const cs_results = document.querySelector('.cs_results');
const filter_button = document.querySelector('.filterButton');

const chosen_State = document.querySelector('.chosen_State');

$(document).ready(() => {
  $('#map').usmap({});
});

async function getData(state) {
  const leg = [];
  
  const responce = await fetch(
    `http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=${Samsons_key}`
  );
  const data = await responce.json();
  // console.log(data)
  leg.push(data.response.legislator);
  // ['@attributes'].cid);

  // console.log(leg[0]);

  console.log(leg);
  return leg[0];
}
async function getContr(cid_name) {
  const contr_arr = [];
  org_total = [];
  const leg_names = [];
  const contr_Res = await fetch(

    `https://www.opensecrets.org/api/?method=candContrib&cid=${cid_name[0]}&cycle=2020&output=json&apikey=${Jooyongs_key}`

  );
  const contributors = await contr_Res.json();
  for (num in contributors.response.contributors.contributor) {
    org_total.push([contributors.response.contributors.contributor[num]['@attributes'].org_name, contributors.response.contributors.contributor[num]['@attributes'].total]);
  }
  leg_names.push([cid_name[1], cid_name[2]]);

  contr_arr.push(cid_name[1], org_total);
  console.log(contr_arr);
  const html = contr_arr.map((place) =>
  // for (x in place) {
  // console.log(place[0]);
  // }

    `
        <li>
            <span class= "name">${place[0]}</span> <br>

        </li>
    `).join('');
  top_contr.innerHTML = html;
  // top_contr.innerHTML = contr_arr[0][1][0]['@attributes'].org_name;

  // console.log(contr_arr[0][0]);
  // [1][0]['@attributes'].org_name);
}

function filter_menu() {
  $checked = "";
  // let checked_filters = document.getElementsByName('f_input');
  for (x = 0; x < 5; x++) {
    checked_filters = document.filter_options.f_input[x].checked;
    if (checked_filters) {
      $checked += (document.filter_options.f_input[x].value);
    }
  }
  console.log($checked)

}

$('.map').usmap({
  click: function (event, data) {
    $('#clicked-state');
    // console.log(data.name);
    const CID = getData(data.name);
    // console.log(numLegs)

    cid_name = [];
    counter = 0;

    CID.then((result) => {
      const cid_name = [];
      // console.log(result['@attributes'])
      for (num in result) {
        // console.log(result)
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        party = result[num]['@attributes'].party;
        // console.log(leg_name)
        cid_name.push([id, leg_name, party]);
      }
      for (num in cid_name) {
        // console.log(cid_name[num]);
        getContr(cid_name[num]);
        getContrByIndustry(cid_name[num]);
      }
    });
  }
});

// Dropdown Function
function drop_down(leg_names) {
  const options = (leg_names)
    .map(
      (name) => `
  <option class= options>
      ${name[0]} (${name[1]})
  </option>
`
    )
    .join('');

  l_select.innerHTML += options;
}

// Individual Contributor display func
function display_IndividualContr() {
  const html = org_total
    .map(
      (place) => `
      <li class=contr_list>
          <span class= "name">${place[0]} donated $${place[1]}</span> <br>
      </li>
  `
    )
    .join('');
  tc_results.innerHTML = html;
}

// Industry Contributor display func
function display_IndustryContr() {
  const html2 = ind_Total
    .map(
      (place) => `
      <li class=contr_list>
          <span class= "name">${place[0]} donated $${place[1]}</span> <br>
      </li>
  `
    )
    .join('');
  ic_results.innerHTML = html2;
}
// Legislator summary display func
function display_candSum() {
  const html3 = summs
    .map(
      (place) => `
      <li class=contr_list>
          <span class= "name">${place[0]} donated $${place[1]}</span> <br>
      </li>
  `
    )
    .join('');
  cs_results.innerHTML = html3;
}

// Event Listeners

selection.addEventListener('change', (event) => {
  filter_selection(event);
});

filter_button.addEventListener('click', async() => {
  filter_menu();
}); 
//  () => {
//   ;
// });
