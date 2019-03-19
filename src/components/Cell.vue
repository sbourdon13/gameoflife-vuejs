<template>
  <div class="cell" :class="{alive: isAlive}"></div>
</template>

<script>
export default {
  name: "Cell",
  data() {
    return {};
  },
  props: {
    isAlive: Boolean
  }
};
</script>

<style scoped>
.cell {
  background-color: white;
  cursor: pointer;
}
.alive {
  background-color: black;
}
</style>