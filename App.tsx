import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  type Winner = 'X' | 'O' | 'Draw' | null;
  const [winner, setWinner] = useState<Winner>(null); 

  const handlePress = (index : number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('Draw');
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const checkWinner = (b : any[]) => {  
  const lines = [
    // Row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    // Column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Logic Behind Choosing Winner
  for (let [a, b1, c] of lines) { 
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a];
    }
  }
  return null;
};

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  const renderBox = (value: number, index: number) => (
    <Pressable
      key={index}
      style={styles.box}
      onPress={() => handlePress(index)}>
      <Text style={styles.boxText}>{value}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((val, idx) => renderBox(val, idx))}
      </View>

      {winner && (
        <Text style={styles.result}>
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
        </Text>
      )}

      <Pressable onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  box: {
    width: '33%',
    height: '33%',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },

  result: {
    marginTop: 30,
    fontSize: 24,
    color: '#f1c40f',
    fontWeight: '600',
  },

  resetButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d35400',
    borderRadius: 8,
  },

  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;