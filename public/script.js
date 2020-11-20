/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const top_contr = document.querySelector('.top_contr');

const l_select = document.querySelector('.l_select');
$(document).ready(() => {
  $('#map').usmap({});
});

async function getData(state) {
  const leg = [];
  const responce = await fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  const data = await responce.json();
  // console.log(data)
  leg.push(data.response.legislator);
  // ['@attributes'].cid);

  // console.log(leg[0]);

  return leg[0];
}

// Beginning Jooyong Function 1
async function getIndustry(foobar) {
  const pattern1 = [];
  const respo = await fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${foobar}&output=json&apikey=165cf0bdb1b94281cb53560f4b66d567`);
  const data2 = await respo.json();
  console.log(data2)
  console.log("Hello, this is a test 1");
  pattern1.push(data2.response.legislator);
  // ['@attributes'].cid);

  // console.log(leg[0]);

  return pattern1[0];
}
//End Jooyong Function 1


async function getContr(cid_name) {
  const contr_arr = [];
  const org_total = [];
async function getContr(cid_name) {
  const contr_arr = [];
  const org_total = [];
  const names = [];
  const contr_Res = await fetch(`https://www.opensecrets.org/api/?method=candContrib&cid=${cid_name[0]}&cycle=2020&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  const contributors = await contr_Res.json();
  for (num in contributors.response.contributors.contributor) {
    org_total.push([contributors.response.contributors.contributor[num]['@attributes'].org_name, contributors.response.contributors.contributor[num]['@attributes'].total]);
  }
  contr_arr.push(cid_name[1], org_total);
  console.log(contr_arr + " " + contr_arr.length);
  console.log(cid_name + " " + cid_name.length);

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

// Beginning Jooyong Function 2
async function getContrByIndustry(foobar2) {
  const array1 = [];
  const array2 = [];
  const industry_js = await fetch(`https://www.opensecrets.org/api/?method=candIndustry&cid=${foobar2[0]}&cycle=2020&output=json&apikey=165cf0bdb1b94281cb53560f4b66d567`);
  const industries = await industry_js.json();
  for (num in industries.response.industries.industry) {
    array2.push([industries.response.industries.industry[num]['@attributes'].industry_name, industries.response.industries.industry[num]['@attributes'].total]);
  }
  array1.push(foobar2[1], array2);
  console.log(array1 + " " + array1.length);
  console.log(foobar2 + " " + foobar2.length);
  console.log("Hello, this is a test 2");

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
// End Jooyong Function 2

  // console.log(contr_arr);
  names.push(cid_name[1])
  console.log(cid_name[1])
  const html = names.map((place) => `
        <li>
            <span class= "name">${place}</span> <br>
        </li>
    `).join('');
  top_contr.innerHTML += html;
  const options = names.map((name) => `
      <option>
          ${name}
      </option>
`).join('');
  // document.createElement('options')
  l_select.innerHTML += options;
}

$('#map').usmap({
  click: function(event, data, data2) { // Added data2 parameter to function, don't think it breaks map
    $('#clicked-state');
    // console.log(data.name);
    const CID = getData(data.name);
    CID.then((result) => {
      const cid_name = [];
      // console.log(result['@attributes'])
      for (num in result) {
        // console.log(result[num]['@attributes']);
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        cid_name.push([id, leg_name]);
      }
      for (num in cid_name) {
        // console.log(cid_name[num]);
        getContr(cid_name[num]);
      }
    });
// Beginning Jooyong Function 3
    const CID2 = getIndustry(data2.name);
    CID2.then((result2) => {
      const cid_name2 = [];
      for (num in result2) {
        id = result2[num]['@attributes'].cid;
        leg_name = result2[num]['@attributes'].firstlast;
        cid_name2.push([id, leg_name]);
      }
      for (num in cid_name2) {
        console.log("Hello, this is a test 3");
        getContrByIndustry(cid_name2[num]);
      }
    }); // End Jooyong Function 3
  }
});