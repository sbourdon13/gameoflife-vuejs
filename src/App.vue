<template>
  <div id="game-of-life">
    <h1>Game of life</h1>
    <div class="logos-container">
      <img class="theodo-logo" alt="Theodo logo" src="./assets/theodo-logo.png">
      <img class="vue-logo" alt="Vue logo" src="./assets/vue-logo.png">
    </div>
    <div class="buttons-container">
      <button @click="randomizeMap()">Generate random map</button>
      <button @click="updateAliveCellsMap()">Next step</button>
      <button @click="clearMap()">Clear map</button>
      <button @click="playGame()">{{ isPlaying ? "Stop" : "Start game!" }}</button>
    </div>
    <grid
      :rows-count="rowsCount"
      :columns-count="columnsCount"
      :aliveCellsMap="aliveCellsMap"
      :toggleCellStateCallback="toggleCellState"
    ></grid>
    <p>Tip: you can click on a cell to toggle its state</p>
  </div>
</template>

<script>
import Cell from "./components/Cell.vue";
import Grid from "./components/Grid.vue";
import { getRandomizedMap } from "./services/grid-helper.js";
import { getNextMap } from "./services/conway-rules.js";

const initialRowsCount = 10;

export default {
  name: "GameOfLife",
  data() {
    return {
      rowsCount: initialRowsCount,
      isPlaying: false,
      aliveCellsMap: {
        R6C15: true,
        R9C13: true,
        R8C18: true,
        R1C25: true,
        R5C24: true
      }
    };
  },
  computed: {
    columnsCount() {
      return 3 * this.rowsCount;
    }
  },
  methods: {
    randomizeMap: function() {
      this.aliveCellsMap = getRandomizedMap(this.rowsCount, this.columnsCount);
    },
    toggleCellState: function(cellId) {
      const newAliveCellsMap = { ...this.aliveCellsMap };
      newAliveCellsMap[cellId] = !newAliveCellsMap[cellId];
      this.aliveCellsMap = newAliveCellsMap;
    },
    updateAliveCellsMap() {
      this.aliveCellsMap = getNextMap(
        this.rowsCount,
        this.columnsCount,
        this.aliveCellsMap
      );
    },
    clearMap() {
      this.aliveCellsMap = {};
    },
    playGame() {
      if (this.isPlaying) {
        clearInterval(this.timer);
      } else {
        this.startGame();
      }
      this.isPlaying = !this.isPlaying;
    },
    startGame() {
      this.timer = setInterval(this.updateAliveCellsMap, 250);
    }
  },
  components: {
    Cell,
    Grid
  }
};
</script>

<style>
#game-of-life {
  padding: 60px 40px;
  position: relative;
}
.logos-container {
  position: absolute;
  top: 0;
  left: 0;
}
.logos-container img {
  height: 40px;
}
.logos-container img + img {
  margin-left: 5px;
}

.buttons-container {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.5);
}

.buttons-container button + button {
  margin-left: 5px;
}
</style>
