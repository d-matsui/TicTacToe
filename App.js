import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Square = props => {
      return (
      <Button
        onPress={() => props.onClick()}
        title={props.value}
      />
      );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return <Square
             value={this.state.squares[i]}
             onClick={() => this.handleClick(i)}
           />;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // exist winner or has already placed
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = "Winner: " + (winner);
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View style={styles.container}>
        <Text>{status}</Text>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare(0) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(1) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(2) }
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare(3) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(4) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(5) }
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.square}>
            { this.renderSquare(6) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(7) }
          </View>
          <View style={styles.square}>
            { this.renderSquare(8) }
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

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // a != null && a = b && a = c means a = b = c (a, b, c != null)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
