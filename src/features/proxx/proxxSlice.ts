import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

/*
Part 1: I choose one dimension array of cells (BoardCell) to represent the game state (ProxxGameState) 
*/

export interface Location {
    column: number;
    row: number;
}

export interface BoardCell {
    id: number;
    isOpen: boolean;
    isBlackHole: boolean;
    countOfAdjacentBlackHoles: number;
    cellLocation: Location;
}

export interface ProxxGameState {
    board: BoardCell[];
}

export const BOARD_SIZE = 8;
const COUNT_OF_CELLS = BOARD_SIZE * BOARD_SIZE;

const getBoardCellIdFromLocation = (location: Location) => BOARD_SIZE * location.row + location.column;
const getBoardCellLocationFromId = (id: number) => ({row: Math.floor( id / BOARD_SIZE), column: id % BOARD_SIZE});

/*
Part 2: Populate your data structure with K=10 black holes placed in random locations
*/

export const COUNT_OF_BLACK_HOLES = 10;

const getRandomBlackHoleId = () =>  Math.floor(Math.random() * COUNT_OF_CELLS);

const getRandomBlackHoleIdArray = () => {
    const randomBlackHoleIdArray: number[] = [];
    for(let i = 0; i < COUNT_OF_BLACK_HOLES; i++) {
        let randomBlackHoleId = getRandomBlackHoleId();
        while(randomBlackHoleIdArray.indexOf(randomBlackHoleId) >= 0) {
            randomBlackHoleId = getRandomBlackHoleId();
        }
        randomBlackHoleIdArray.push(randomBlackHoleId);
    }
    return randomBlackHoleIdArray;
}

/*
Part 3: For each cell without a black hole, compute and store the number of adjacent black hole
*/

const shift = (base: Location, shift: Location) => (
    {column: base.column + shift.column, row: base.row + shift.row}
);

const isValid = (location: Location) => 
    location.column >= 0 
    && location.row >=0 
    && location.column < BOARD_SIZE
    && location.row < BOARD_SIZE;

const checkAndInc = (countOfAdjacentBlackHoles: number[], location: Location) => {
    if(isValid(location)) countOfAdjacentBlackHoles[getBoardCellIdFromLocation(location)]++;
}

const calculateCountOfAdjacentBlackHoles = (blackHolesCellsIds: number[]) => {
    const countOfAdjacentBlackHoles = new Array(COUNT_OF_CELLS).fill(0);
    for(let i=0; i<COUNT_OF_BLACK_HOLES; i++) {
        const blackHoleLocation = getBoardCellLocationFromId(blackHolesCellsIds[i]);
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: -1, row: -1})); 
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: 0, row: -1})); 
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: 1, row: -1})); 
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: -1, row: 0}));
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: 1, row: 0}));
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: -1, row: 1}));
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: 0, row: 1}));
        checkAndInc(countOfAdjacentBlackHoles, shift(blackHoleLocation, {column: 1, row: 1}));
    }
    return countOfAdjacentBlackHoles;
}

/*
Part 4:  logic that updates which cells become visible when a cell is clicked. 
I use Redux-toolkit, because it provides application state immutability automatically 
and reduce boilerplate code. 
*/

const initiateBoard = () => {
    const board: BoardCell[] = [];
    const blackHolesCellsIds = getRandomBlackHoleIdArray();
    const countOfAdjacentBlackHoles = calculateCountOfAdjacentBlackHoles(blackHolesCellsIds);
    for(let i = 0; i < COUNT_OF_CELLS; i++) {
        board.push({
            id: i,
            isOpen: false,
            isBlackHole: blackHolesCellsIds.indexOf(i) >= 0,
            countOfAdjacentBlackHoles: countOfAdjacentBlackHoles[i],
            cellLocation: getBoardCellLocationFromId(i),
        });
    }
    return board;
}

const initialState: ProxxGameState = {
    board: initiateBoard(),
}

function checkAndOpen(state: ProxxGameState, location: Location) {
    if(isValid(location)) {
        const id = getBoardCellIdFromLocation(location);
        openAround(state, id);
    }
}

function openAround(state: ProxxGameState, id: number) {
    const cell = state.board[id];
    if(!cell.isOpen) {
        cell.isOpen = true;
        if(cell.countOfAdjacentBlackHoles === 0) {
            const cellLocation = getBoardCellLocationFromId(cell.id);
            checkAndOpen(state, shift(cellLocation, {column: -1, row: -1})); 
            checkAndOpen(state, shift(cellLocation, {column: 0, row: -1})); 
            checkAndOpen(state, shift(cellLocation, {column: 1, row: -1})); 
            checkAndOpen(state, shift(cellLocation, {column: -1, row: 0}));
            checkAndOpen(state, shift(cellLocation, {column: 1, row: 0}));
            checkAndOpen(state, shift(cellLocation, {column: -1, row: 1}));
            checkAndOpen(state, shift(cellLocation, {column: 0, row: 1}));
            checkAndOpen(state, shift(cellLocation, {column: 1, row: 1})); 
        }
    }
}

export const proxxSlice = createSlice({
    name: 'proxx',
    initialState,
    reducers: {
        openBoardCell: (state, action: PayloadAction<number>) => {
            openAround(state, action.payload);
        },
    },
});

export const { openBoardCell } = proxxSlice.actions;

export const selectProxx = (state: RootState) => state.proxx;

export default proxxSlice.reducer;