import { getCellId } from './grid-helper'

/**
 * This function returns the Ids of the directly nearby cells
 *
 * @param {integer} row
 * @param {integer} column
 */
const getNeighbours = (row, column) => {
  return [
    getCellId(row - 1, column - 1),
    getCellId(row - 1, column),
    getCellId(row - 1, column + 1),
    getCellId(row, column - 1),
    getCellId(row, column + 1),
    getCellId(row + 1, column - 1),
    getCellId(row + 1, column),
    getCellId(row + 1, column + 1)
  ]
}

/**
 * This function returns the count of a position nearby alive cells
 *
 * @param {integer} row
 * @param {integer} column
 * @param {Object}  aliveCellsMap
 */
const getAliveNeighboursCount = (row, column, aliveCellsMap) => {
  return getNeighbours(row, column).map(val => !!aliveCellsMap[val]).reduce((count, isAliveCell) => {
    if (isAliveCell) count++;
    return count;
  })
}

/**
 * This function returns the next state of the cell according to Conway's rules
 *
 * @param {boolean} isAliveCell
 * @param {Object}  aliveNeighboursCount
 */
const getCellNextState = (isAliveCell, aliveNeighboursCount) => {
  if (aliveNeighboursCount < 2 || aliveNeighboursCount > 3) {
    return false;
  }
  else if (aliveNeighboursCount === 2) { return isAliveCell; }
  else if (aliveNeighboursCount === 3) { return true; }
}

/**
 * This function returns the new map of alive cells, after 1 iteration
 *
 * @param {integer} rowsCount
 * @param {integer} columnsCount
 * @param {Object}  aliveCellsMap
 */
export const getNextMap = (rowsCount, columnsCount, aliveCellsMap) => {
  const newAliveCellsMap = {};

  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < columnsCount; j++) {
      let cellId = getCellId(i, j)
      newAliveCellsMap[cellId] = getCellNextState(!!aliveCellsMap[cellId], getAliveNeighboursCount(i, j, aliveCellsMap))
    }
  }

  return newAliveCellsMap;
}
