<template src="./eyedrop.html"></template>

<script lang="ts" src="./eyedrop.ts">
</script>

<style lang="scss">
.magnifier-glass {
  position: absolute;
  border: 0px solid #000;
  border-radius: 50%;
  cursor: none;
  /*Set the size of the magnifier glass:*/
  pointer-events: none;
}

.magnifier-color {
  position: absolute;
  background-color: rgb(33, 37, 43);
  color: white;
  border-radius: 1em;
  cursor: none;
  /*Set the size of the magnifier glass:*/
  width: 300px;
  padding: 5px;
  pointer-events: none;
  text-align: center;
  font-weight: bold;
}

.magnifier-color-square {
  height: 0.8em;
  width: 0.8em;
  display: inline-block;
}
</style>
