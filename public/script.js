/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

let cid_name = [];
let org_total = [];
let ind_Total = [];
let numLegs;
let counter;
let rep;
const Samsons_key = '0e31f29705fa26f604e00f070aea5e11';
const Jooyongs_key = '165cf0bdb1b94281cb53560f4b66d567';

const tc_results = document.querySelector('.tc_results');
const l_select = document.querySelector('.l_select');
const ic_results = document.querySelector('.ic_results');

const chosen_State = document.querySelector('.chosen_State');

$(document).ready(() => {
  $('.map').usmap({});
});

async function getData(state) {
  const leg = [];

  const responce = await fetch(
    `http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=${Samsons_key}`
  );
  const data = await responce.json();
  // console.log(data)
  leg.push(data.response.legislator);
  // console.log(leg[0]);
  state_Data = leg;
  numLegs = leg[0].length;
  rep = numLegs - 2;
  chosen_State.innerText = `Your chosen state is ${state} which has ${rep} Representatives and 2 Senators`;

  console.log(rep)
  return leg[0];
}

async function getContr(cid_name) {
  counter += 1;
  // console.log(counter)
  const contr_arr = [];
  org_total = [];
  const leg_names = [];

  const contr_Res = await fetch(

    `https://www.opensecrets.org/api/?method=candContrib&cid=${cid_name[0]}&cycle=2020&output=json&apikey=${Jooyongs_key}`

  );
  const contributors = await contr_Res.json();
  for (num in contributors.response.contributors.contributor) {
    org_total.push([
      contributors.response.contributors.contributor[num]['@attributes']
        .org_name,
      contributors.response.contributors.contributor[num]['@attributes'].total
    ]);
  }
  leg_names.push(cid_name[1]);
  
  contr_arr.push(cid_name[1], org_total);

  if (counter <= numLegs) {
    drop_down(leg_names);
  } else if (counter > numLegs) {
    display_IndividualContr();
  }
}

// Beginning Jooyong Function 2
async function getContrByIndustry(cid_name) {
  const array1 = [];
  ind_Total = [];
  const ind_Names = [];
  const industry_js = await fetch(
    `https://www.opensecrets.org/api/?method=candIndustry&cid=${cid_name[0]}&cycle=2020&output=json&apikey=165cf0bdb1b94281cb53560f4b66d567`
  );
  const industries = await industry_js.json();
  for (num in industries.response.industries.industry) {
    ind_Total.push([
      industries.response.industries.industry[num]['@attributes'].industry_name,
      industries.response.industries.industry[num]['@attributes'].total
    ]);
  }
  ind_Names.push(cid_name[1]);
  array1.push(cid_name[1], ind_Total);
  // console.log(array1);

  if (counter > numLegs) {
    display_IndustryContr();
  }
  // // End Jooyong Function 2
}

function filter_selection(evt) {
  selected = (evt.target.value);

  if (cid_name.length === 0) {
    return;
  }

  for (x in cid_name) {
    if (selected === cid_name[x][1]) {
      getContr(cid_name[x]);
      getContrByIndustry(cid_name[x]);
    }
  }
}

$('.map').usmap({
  click: function (event, data) {
    $('#clicked-state');
    $('.options').remove();
    $('.contr_list').remove();
    const CID = getData(data.name);
    console.log(numLegs)
    
    cid_name = [];
    counter = 0;

    CID.then((result) => {
      // console.log(counter)
      for (num in result) {
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        cid_name.push([id, leg_name]);
      }

      // console.log(cid_name);
      for (num in cid_name) {
        getContr(cid_name[num]);
        getContrByIndustry(cid_name[num]);
      }
    });
  }
});

function drop_down(leg_names) {
  const options = leg_names
    .map(
      (name) => `
  <option class= options>
      ${name}
  </option>
`
    )
    .join('');

  l_select.innerHTML += options;
}

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
const selection = document.querySelector('.l_select');

selection.addEventListener('change', (event) => {
  filter_selection(event);
});
