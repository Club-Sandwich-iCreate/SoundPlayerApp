import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

window.navigator.userAgent = 'react-native';
import SocketIOClient from 'socket.io-client';

import {
  Player,
  Recorder,
  MediaStates
} from 'react-native-audio-toolkit';

export default class App extends Component {

  state = {
    soundSource: 'Sound 0',
    name: 'Laouen'
  }

  constructor() {
    super();
    this.socket = SocketIOClient('https://serversocket2018.herokuapp.com/');
    this.socket.on('update', () => this.setState({name: 'Felix'}));
  }

  onSelect(i, v) {
    this.setState({
      soundSource: v
    })
  }

  _onPress() {
    // Disable button while recording and playing back
    this.setState({disabled: true});
  
    // Start recording
    let rec = new Recorder("filename.mp4").record();
  
    // Stop recording after approximately 3 seconds
    setTimeout(() => {
      rec.stop((err) => {
        // NOTE: In a real situation, handle possible errors here
  
        // Play the file after recording has stopped
        new Player("filename.mp4")
        .play()
        .on('ended', () => {
          // Enable button again after playback finishes
          this.setState({disabled: false});
        });
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight disabled={this.state.disabled} onPress={() => this._onPress()}>
          <Text>
            Press me!
          </Text>
        </TouchableHighlight>
        <ModalDropdown onSelect={this.onSelect.bind(this)} options={['Sound 1', 'Sound 2', 'Sound 3', 'Sound 4']}/>
        <Text>{this.state.soundSource}</Text>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
