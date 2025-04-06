import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { FaCheckCircle, FaChessKing, FaQuestionCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { RiResetLeftFill } from "react-icons/ri";
import { FaRegChessKing } from "react-icons/fa6";
import { GoCheckCircleFill } from "react-icons/go";

const ChessBox = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [puzzle, setPuzzle] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [validMoves, setValidMoves] = useState<string[]>([]);
    const [moveHighlight, setMoveHighlight] = useState<{ [key: string]: { backgroundColor: string } }>({});
    const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
    const chessRef = useRef(new Chess());
    const userMovesOnly = puzzle?.puzzle?.solution?.filter((_: any, index: any) => index % 2 === 0) || [];
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

    useEffect(() => {
        fetchPuzzle();
    }, []);

    useEffect(() => {
        if (puzzle?.game?.pgn) {
            chessRef.current.loadPgn(puzzle.game.pgn);
        }
    }, [puzzle]);

    useEffect(() => {
        if (currentStep % 2 === 1) {
            setTimeout(handleAIMove, 500); // Black moves automatically after White
        }
    }, [currentStep]);

    useEffect(() => {
        if (puzzle?.game?.pgn) {
            const chess = chessRef.current;
            chess.loadPgn(puzzle.game.pgn);

            // Get the first move's color
            const moves = chess.history({ verbose: true });
            if (moves.length > 0) {
                const firstMoveColor = moves[0].color;
                setBoardOrientation(firstMoveColor === "w" ? "black" : "white");
            }
        }
    }, [puzzle]);

    const fetchPuzzle = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://lichess.org/api/puzzle/daily");
            if (!response.ok) throw new Error("Failed to fetch puzzle");
            const data = await response.json();
            if (!data?.game?.pgn || !data?.puzzle?.solution) throw new Error("Invalid puzzle data");

            chessRef.current.loadPgn(data.game.pgn);
            setPuzzle(data);
            setCurrentStep(0);
            setValidMoves([]);
            setMoveHighlight({});
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const onPieceClick = (square: any) => {
        const chess = chessRef.current;
        const piece = chess.get(square);
        if (!piece || piece.color !== chess.turn()) return;

        const moves = chess.moves({ square, verbose: true }).map(move => move.to);
        setValidMoves(moves);
    };

    const onDrop = (sourceSquare: string, targetSquare: string) => {
        const chess = chessRef.current;
        const solution = puzzle?.puzzle?.solution || [];

        if (currentStep >= solution.length) return false; // No more moves left

        const expectedMove = solution[currentStep]; // Expected move from the solution
        const moveAttempt = `${sourceSquare}${targetSquare}`;

        if (moveAttempt === expectedMove) {
            chess.move({ from: sourceSquare, to: targetSquare }); // Make White's move
            setMoveHighlight({ [targetSquare]: { backgroundColor: "rgba(0, 255, 0, 0.5)" } }); // Green for success
            setCurrentStep(prev => prev + 1);
            setValidMoves([]);

            if (currentStep + 1 === solution.length) {
                setIsPuzzleComplete(true);
            }
            return true;
        } else {
            setMoveHighlight({ [targetSquare]: { backgroundColor: "rgba(255, 0, 0, 0.5)" } }); // Red for wrong move
            setTimeout(() => setMoveHighlight({}), 800); // Clear after 800ms
            return false;
        }
    };

    const handleAIMove = () => {
        const chess = chessRef.current;
        const solution = puzzle?.puzzle?.solution || [];

        if (currentStep >= solution.length) return; // No more moves left

        const aiMove = solution[currentStep]; // Get Black's move
        chess.move({ from: aiMove.slice(0, 2), to: aiMove.slice(2, 4) }); // Make move
        setCurrentStep(prev => prev + 1);

        if (currentStep + 1 === solution.length) {
            setTimeout(() => alert("Puzzle Completed! 🎉"), 500);
        }
    };

    const resetPuzzle = () => {
        if (puzzle?.game?.pgn) {
            chessRef.current.loadPgn(puzzle.game.pgn); // Reset board
            setCurrentStep(0); // Reset step count
            setValidMoves([]); // Clear highlights
            setMoveHighlight({});
            setIsPuzzleComplete(false);
        }
    };

    return (
        <div className="sidebar-chess rounded-lg ">

            <div className="mt-6 w-full text-center">
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="border-b border-gray-600 rounded-t-xl">
                            <td className="font-semibold p-2 rounded-t-lg bg-gray-700 text-white flex justify-center items-center w-full">
                                <span className="text-[12px] flex-grow text-center">Daily Chess Puzzle</span>
                                <button onClick={resetPuzzle} title="Reset" className="ml-2 !p-1 float-right !text-xs">
                                    <RiResetLeftFill />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="flex justify-center items-center">
                                <div className="text-[12px] flex p-2">
                                    <span className="mr-2">You are </span>
                                    {boardOrientation == "white" ? <FaChessKing size={15} color="black" /> : <FaChessKing size={15} color="white" />}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {loading && <p>Loading puzzle...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {puzzle ? (
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Chessboard
                            boardWidth={200}
                            position={chessRef.current.fen()}
                            // boardOrientation={boardOrientation} // Might need later on
                            onPieceDrop={onDrop}
                            onSquareClick={onPieceClick}
                            customSquareStyles={{
                                ...validMoves.reduce((styles, square) => {
                                    styles[square] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
                                    return styles;
                                }, {} as { [key: string]: { backgroundColor: string } }),
                                ...moveHighlight,
                            }}
                        />
                        {/* Puzzle Complete Overlay */}
                        {isPuzzleComplete && (
                            <div
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                className="animate-fadeIn absolute inset-0 bg-white backdrop-blur-[1px] flex flex-col pt-4 justify-top items-center text-white text-xl font-bold"
                            >
                                <div className="mb-4 flex items-center space-x-2 border-gray-600">
                                    <p style={{ textShadow: '4px 4px 10px #000000' }}>Puzzle Complete! </p>
                                    <div className="relative" >
                                        {/* Green check circle */}
                                        <GoCheckCircleFill color="green" size={20} />
                                        {/* White background circle */}
                                        <div className="absolute inset-0 flex justify-center items-center">
                                            <div className="w-5 h-5 bg-white rounded-full z-[-1]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <span className="text-xs">Solve the puzzle in {Math.ceil(puzzle.puzzle.solution.length / 2)} turns</span>

                    <p className="mt-2 flex gap-1">
                        <strong>Want the Solution</strong>
                        <FaQuestionCircle size={15} data-tooltip-id="solution-tooltip" className="text-blue-500" />
                    </p>

                    <Tooltip id="solution-tooltip" place="top" clickable>
                        <div className="text-sm tooltip-content">
                            <p>
                                <strong>Moves:</strong> {userMovesOnly.length > 0 ? userMovesOnly.join(", ") : "No solution available"}
                            </p>
                            {puzzle.puzzle?.id && (
                                <a
                                    href={`https://lichess.org/training/${puzzle.puzzle.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline block mt-1"
                                >
                                    Solve on Lichess
                                </a>
                            )}
                        </div>
                    </Tooltip>
                </div>
            ) : (
                <p className="text-red-500">No puzzle available.</p>
            )}

        </div>
    );
};

export default ChessBox;
