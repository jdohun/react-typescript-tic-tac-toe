import React, {useState} from 'react';
import './styles.css'

const Game = () => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    const handlePlay = (nextSquares: Array<string | null>) => {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    );
}

interface BoardProps {
    xIsNext: boolean,
    squares: Array<string | null>,
    onPlay: (nextSquares: Array<string | null>) => void
}

const Board = ({xIsNext, squares, onPlay}: BoardProps): JSX.Element => {
    const winner: string | null = calculateWinner(squares);

    const handleClick = (i: number) => {
        if (squares[i] || winner) {
            return;
        }

        const nextSquares: Array<string | null> = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
};

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

const Square = ({value, onSquareClick}: SquareProps): JSX.Element => {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
};

const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i: number = 0; i < lines.length; i++) {
        const [a, b, c]: number[] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
