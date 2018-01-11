/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
const originShift = 2 * Math.PI * 6378137 / 2.0;
const typeLocal = [
  {
    "id": 1,
    "designation": "Archives",
    "color":"#f2f268",
    "sortOrder":1
},
{
    "id": 2,
    "designation": "Atelier",
    "color":"#e6e0cb",
    "sortOrder":2
},
{
    "id": 3,
    "designation": "Aula, auditoire",
    "color":"#e6e0cb",
    "sortOrder":3
},
{
    "id": 4,
    "designation": "Autres surfaces",
    "color":"#e3e3d6",
    "sortOrder":12
},
{
    "id": 5,
    "designation": "Bibliothèque",
    "color":"#f2f5ce",
    "sortOrder":4
},
{
    "id": 6,
    "designation": "Bureau",
    "color":"#bed2fe",
    "sortOrder":5
},
{
    "id": 7,
    "designation": "Cafétéria",
    "color":"#c9b088",
    "sortOrder":6
},
{
    "id": 8,
    "designation": "Laboratoire",
    "color":"#f9b542",
    "sortOrder":7
},
{
    "id": 9,
    "designation": "Local technique",
    "color":"#acac9f",
    "sortOrder":8
},
  {
    "id":10,
    "designation": "Salle de réunion",
    "color":"#b3f984",
      "sortOrder":10
},
{
    "id":11,
    "designation": "Salle d&#39;enseignement",
    "color":"#f63742",
    "sortOrder":9
},

{
    "id":12,
    "designation": "Salle informatique",
    "color":"#3c89f5",
    "sortOrder":11
 } ];


export default class App extends Component{

 
  toWebMercatorY = (latitude) => {
      let lat = (latitude / originShift) * 180.0;
      return   lat = 180 / Math.PI * (2 * Math.atan( Math.exp( lat * Math.PI / 180.0)) - Math.PI / 2.0);
  }
  
  // below formula to project a point to a coordinate
  toWebMercatorX= (longitude) =>{
     return (longitude / originShift) * 180.0;
  }
  colorByLocType = (id) => {
    let locObj =typeLocal.filter( (l) => {
      return l.id === id;
    } );
    return locObj.length >0 ? locObj[0].color :'#f7f7f7';
  }
  renderLocals = () =>{
    const data = require('./demo/locaux_bat.json'); 
    let maplocals= data.features.map( (f, index) =>{
      let aLatLng = f.geometry.rings[0].map( p => ({
        latitude: this.toWebMercatorY(p[1]),
        longitude: this.toWebMercatorX(p[0])
      }) )
      const locals = <MapView.Polygon fillColor = {this.colorByLocType(f.attributes.LOC_TYPE_ID) }key={`${f.attributes.BAT_ID}_${f.attributes.ETG_ID}_${index}`} coordinates={[...aLatLng]} />
      return locals;
    }
   );
   console.log(maplocals);
   return maplocals;
  }
  renderBuildings = () => {
    const data = require('./demo/bats.json');   
    let mapMarkers= data.features.map( f =>
    <MapView.Marker key={f.attributes.BAT_ID}
     coordinate={{latitude:this.toWebMercatorY(f.geometry.y), longitude:this.toWebMercatorX(f.geometry.x)}}
     title={`nom ${f.attributes.BAT_ID}`}
     description={' Nom du Bâtiment '}
     />);
     console.log(mapMarkers);
     return mapMarkers;
  }
  render() {
    return (
      <View style={styles.container}>
       <MapView style = {styles.map}
        
        showsCompass
        region={{
            latitude: 46.99179,
            latitudeDelta:0.1,
            longitude:6.931,
            longitudeDelta:0.1
        }}
       >
       {this.renderBuildings()}
       {this.renderLocals()}
       </MapView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  map: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
  }
});
