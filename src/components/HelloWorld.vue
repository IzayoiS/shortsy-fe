<script setup lang="ts">
const hello = '<b>Hello World</b>'
const buttonDisable = false
const data = {
  id: 1,
  name: 'iqbal',
}
</script>

<template>
  <b1 v-bind="data">{{ hello }}</b1>
  <h1>{{ data.name }}</h1>
  <div :class="data.id" v-html="hello"></div>
  <button :disabled="buttonDisable">Click Me</button>
</template>

<style scoped></style>
