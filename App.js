import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }

  render() {
    return (
      <Button
        onPress={() => this.setState({value: "X"})}
        title={this.state.value}
      />
    )
  }
}

class Board extends Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare("0") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("1") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("2") }
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare("3") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("4") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("5") }
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare("6") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("7") }
          </View>
          <View style={styles.square}>
            { this.renderSquare("8") }
          </View>
        </View>
      </View>
    )
  }
}

export default class Game extends Component {
  render() {
    return (
      <View>
        <Board />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 50,
    height: 50,
    margin: 10,
  }
})
