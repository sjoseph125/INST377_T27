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
  click: function(event, data) {
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
  }
});