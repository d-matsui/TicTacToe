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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <View>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(""),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // it enables to fix future steps which are already meaningless
    // TODO: need to review to understand (why + 1?)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // rendering the latest square
    const current = history[history.length - 1];
    // console.log(current);
    const squares = current.squares.slice();

    // exist winner or has already placed
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    // rendering square of specific stepNumber, not the latest one
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
            "Go to move #" + move :
            "Go to game start";
      return (
        <Button
          key={move}
          onPress={() => this.jumpTo(move)}
          title={desc}
          color="green"
        />
      );
    })

    let status;
    if (winner) {
      status = "Winner: " + (winner);
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View style={styles.container}>
        <Text style={styles.state}>{status}</Text>
        <Board
          onClick={i => this.handleClick(i)}
          squares={current.squares}
        />
        <View style={styles.moves}>
          {moves}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 0,
  },
  square: {
    width: 50,
    height: 50,
    padding: 5,
  },
  state: {
    marginVertical: 30,
    fontWeight: "bold",
    fontSize: 30,
  },
  moves: {
    marginVertical: 20,
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
