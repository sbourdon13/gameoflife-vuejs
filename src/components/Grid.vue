<template>
  <div class="grid__container" :style="`--rows:${rowsCount}; --columns:${columnsCount};`">
    <cell
      v-for="n in cellsCount"
      :isAlive="isCellAlive(n)"
      :key="n"
      @click.native="onCellClicked(n)"
    ></cell>
  </div>
</template>

<script>
import Cell from "./Cell.vue";
import * as gridHelper from "./../services/grid-helper.js";

export default {
  props: {
    rowsCount: {
      type: Number,
      required: true
    },
    columnsCount: {
      type: Number,
      required: true
    },
    aliveCellsMap: Object,
    toggleCellStateCallback: Function
  },
  computed: {
    cellsCount() {
      return this.rowsCount * this.columnsCount;
    }
  },
  methods: {
    isCellAlive(index) {
      const cellId = gridHelper.getCellIdFromIndex(index, this.columnsCount);
      return !!this.aliveCellsMap[cellId];
    },
    onCellClicked(index) {
      this.toggleCellStateCallback(
        gridHelper.getCellIdFromIndex(index, this.columnsCount)
      );
    }
  },
  components: {
    Cell
  }
};
</script>

<style scoped>
.grid__container {
  width: 90vw;
  height: 30vw;
  margin: auto;
  display: grid;
  border: solid 1px black;
  background-color: black;
  grid-gap: 1px;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
}
</style>