/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

let cid_name = [];
const Samsons_key = '0e31f29705fa26f604e00f070aea5e11';
const Jooyongs_key = '165cf0bdb1b94281cb53560f4b66d567';

const top_contr = document.querySelector('.top_contr');
const l_select = document.querySelector('.l_select');

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
  return leg[0];
}

async function getContr(cid_name) {
  const contr_arr = [];
  const org_total = [];
  const names = [];
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
  names.push(cid_name[1]);
  contr_arr.push(cid_name[1], org_total);
  console.log(org_total)

  const html = org_total
    .map(
      (place) => `
        <li>
            <span class= "name">${place[0]} donated $${place[1]}</span> <br>
        </li>
    `
    )
    .join('');
  top_contr.innerHTML = html;

  // if (cid_name > 1) {
  // names.push(cid_name[1]);
  const options = names
    .map(
      (name) => `
      <option>
          ${name}
      </option>
    `
    )
    .join('');

  l_select.innerHTML += options;
  // }
}

// Beginning Jooyong Function 2
async function getContrByIndustry(foobar2) {
  const array1 = [];
  const array2 = [];
  const industry_js = await fetch(
    `https://www.opensecrets.org/api/?method=candIndustry&cid=${foobar2[0]}&cycle=2020&output=json&apikey=165cf0bdb1b94281cb53560f4b66d567`
  );
  const industries = await industry_js.json();
  for (num in industries.response.industries.industry) {
    array2.push([
      industries.response.industries.industry[num]['@attributes'].industry_name,
      industries.response.industries.industry[num]['@attributes'].total
    ]);
  }
  array1.push(foobar2[1], array2);
  // console.log(array1);
  // console.log(array1 + " " + array1.length);
  // console.log(foobar2 + " " + foobar2.length);

  // const html = contr_arr.map((place) =>
  // // for (x in place) {
  // // console.log(place[0]);
  // // }

  //   `
  //       <li>
  //           <span class= "name">${place[0]}</span> <br>
  //       </li>
  //   `).join('');
  // top_contr.innerHTML = html;

  // // End Jooyong Function 2
}

function filter_selection(evt) {
  selected = (evt.target.value);

  if (cid_name.length === 0) {
    return;
  }

  for (x in cid_name) {
    // console.log(cid_name[x][1])
    if (selected === cid_name[x][1]) {
      getContr(cid_name[x]);
    }
  }
}

$('.map').usmap({
  click: function (event, data) {
    $('#clicked-state');
    // l_select.innerHTML = '<option> Choose A Legislator </option>';
    const CID = getData(data.name);
    cid_name = [];
    CID.then((result) => {
      // cid_name = [];
      for (num in result) {
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        cid_name.push([id, leg_name]);
      }

      console.log(cid_name.length);
      for (num in cid_name) {
        getContr(cid_name[num]);
        getContrByIndustry(cid_name[num]);
      }
    });
  }
});

const selection = document.querySelector('.l_select');

selection.addEventListener('change', (event) => {
  filter_selection(event);
});
