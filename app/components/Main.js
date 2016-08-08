'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, MapView, TextInput, Dimensions, StatusBarIOS, TouchableHighlight, AsyncStorage } from 'react-native';
import Chat from './chat'
import MapComponent from './Map.js'
import searchRoutes from './searchRoutes'
import createRoute from './createRoute'
import myEvents from './myEvents'
import permissions from 'react-native-permissions'

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}
const io = require('socket.io-client/socket.io');
import userAgent from '../utils/userAgent'


const { width, height } = Dimensions.get('window')

class Main extends Component {

  constructor(props) {
    super(props);
    this.navToSearchRoutes = this.navToSearchRoutes.bind(this);
    this.navToEvents = this.navToEvents.bind(this);
    this.navToCreateRoute = this.navToCreateRoute.bind(this);

    this.socket = io('https://wegoios.herokuapp.com',  {jsonp: false, transports:['websocket'], allowUpgrades:true});
    this.state = {
      userId:'',
      username: '',
      eventId: '1',//eventId: props.eventId,   //this will come from group list view and pass to server
      socket:this.socket
    }
    AsyncStorage.getItem("username").then((value) => {
      console.log("username:", value)
      this.setState({
        username : value
      })
    });
    AsyncStorage.getItem("userId").then((value) => {
      console.log("userId:", value)
      this.setState({
        userId : value
      })
    });

}

  navToSearchRoutes(){
    this.props.navigator.push({
      component: searchRoutes,
      title: "Search Routes"
    });
  }

  navToEvents(){
    this.props.navigator.push({
      component: myEvents,
      title: "Events"
    });
  }

  navToCreateRoute(){
    this.props.navigator.push({
      component: createRoute,
      title: "Create Route"
    });
  }

   componentDidMount() {
     console.log('open socket', this.state.userId, this.state.username)
      this.state.socket = this.socket
      this.socket.emit('intitialize',{eventId:this.state.eventId, userId:this.state.userId, username:this.state.username})
 }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent socket={this.state.socket}/>
        <Chat socket={this.socket}/>
        <TouchableHighlight
          style={styles.searchRoutesBtn}
          onPress={() => this.navToSearchRoutes()}>
          <Text>Search</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.eventsBtn}
          onPress={() => this.navToEvents()}>
          <Text>Events</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.createRouteBtn}
          onPress={() => this.navToCreateRoute()}>
          <Text>Create Route</Text>
        </TouchableHighlight>
        <Text style={styles.welcome}>
        </Text>
        <MapView
          style={styles.map}
          annotations={this.state.users}
          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: 'blue',
            lineWidth: 8,
          }]}
        />
        <View style={styles.navBar}><Text style={styles.navBarText}>Karmic Koalas</Text></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchRoutesBtn: {
    flex: 1,
    bottom:0,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  eventsBtn: {
    flex: 1,
    bottom: 0,
    left: 75,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  createRouteBtn: {
    flex: 1,
    bottom: 0,
    left: 150,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12
  }
});

module.exports = Main;
