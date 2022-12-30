// import { usePlacesWidget } from "react-google-autocomplete";
// import React from "react";

// export default function AutoComplete(props) {
//   const myKey = process.env.REACT_APP_MAP_API_KEY;
//   const { setAddress } = props;
//   const { ref: locationRef } = usePlacesWidget({
//     apiKey: myKey,
//     onPlaceSelected: (place) => {
//       // setAddress(
//       //   place.formatted_address,
//       //   place.geometry.location.lat(),
//       //   place.geometry.location.lng()
//       // );
//       console.log(place)
//     },
//     options: {
//       types: ["parking", "restaurant"],
//       componentRestrictions: { country: "ca" },
      // fields: ["name", "formatted_address", "geometry"],
//     },
//     inputAutocompleteValue: "text",
//   });

//   return (
//     <>
//       <input
//         type="text"
//         ref={locationRef}
//         placeholder="Where do you want to park?"
//         autoComplete="text"
//       />
//     </>
//   );
// }



// export default function AutoComplete({map, mapApi}) {
//   // constructor(props) {
//   //   super(props);
//   //   this.clearSearchBox = this.clearSearchBox.bind(this);
//   // }

//   // componentDidMount({ map, mapApi } = this.props) {
//   //   const options = {
//   //     // restrict your search to a specific type of result
//   //     // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
//   //     // restrict your search to a specific country, or an array of countries
//   //     // componentRestrictions: { country: ['gb', 'us'] },
//   //   };
//   //   this.autoComplete = new mapApi.places.Autocomplete(
//   //     this.searchInput,
//   //     options,
//   //   );
//   //   this.autoComplete.addListener('place_changed', this.onPlaceChanged);
//   //   this.autoComplete.bindTo('bounds', map);
//   // }

//   // componentWillUnmount({ mapApi } = this.props) {
//   //   mapApi.event.clearInstanceListeners(this.searchInput);
//   // }

//   onPlaceChanged = (map, addplace) => {
//     const place = autoComplete.getPlace();

//     if (!place.geometry) return;
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);
//     }

//     addplace(place);
//     this.searchInput.blur();
//   };

//   // clearSearchBox() {
//   //   this.searchInput.value = '';
//   // }


//     return (
//         <input
//           ref={(ref) => {
//             this.searchInput = ref;
//           }}
//           type="text"
//           onFocus={this.clearSearchBox}
//           placeholder="Enter a location"
//         />
//     );
  
// }

