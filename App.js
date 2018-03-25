import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

window.navigator.userAgent = 'react-native';
import SocketIOClient from 'socket.io-client';

export default class App extends Component {

  state = {
    soundSource: 'Sound 0',
  }

  constructor() {
    super();
    this.socket = SocketIOClient('https://serversocket2018.herokuapp.com/');
    this.socket.on('update', () => this.setState({name: 'None'}));
  }

  onSelect(i, v) {
    this.setState({
      soundSource: v
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ModalDropdown onSelect={this.onSelect.bind(this)} options={['Sound 1', 'Sound 2', 'Sound 3', 'Sound 4']}/>
        <Text>{this.state.soundSource}</Text>
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
