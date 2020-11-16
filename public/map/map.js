/* eslint-disable func-names */
/* eslint-disable linebreak-style */
$('#map').usmap({
  click: function(event, data) {
    $('#clicked-state');
    console.log(data.name);
  }
});

// $('#map').usmap({showLabels: true});

// $(document).ready(() => {
//   $('#map').usmap({
//     stateSpecificStyles: {
//       AK: {fill: '#f00'}
//     },
//     stateSpecificHoverStyles: {
//       HI: {fill: '#ff0'}
//     },

//     mouseoverState: {
//       HI: function(event, data) {
//         // return false;
//       }
//     },

//     click: function(event, data) {
//       $('#alert')
//         .text(`Click ${data.name} on map 1`)
//         .stop()
//         .css('backgroundColor', '#ff0')
//         .animate({backgroundColor: '#ddd'}, 1000);
//     }
//   });

//   $('#map2').usmap({
//     stateStyles: {
//       fill: '#025',
//       'stroke-width': 1,
//       stroke: '#036'
//     },
//     stateHoverStyles: {
//       fill: 'teal'
//     },

//     click: function(event, data) {
//       $('#alert')
//         .text(`Click ${data.name} on map 2`)
//         .stop()
//         .css('backgroundColor', '#af0')
//         .animate({backgroundColor: '#ddd'}, 1000);
//     }
//   });

//   $('#over-md').click((event) => {
//     $('#map').usmap('trigger', 'MD', 'mouseover', event);
//   });

//   $('#out-md').click((event) => {
//     $('#map').usmap('trigger', 'MD', 'mouseout', event);
//   });
// });