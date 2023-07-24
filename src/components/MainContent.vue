<script setup lang="ts">

import { ref } from 'vue';
import { getListPage } from '../api/courses';
import Carousel from '../components/Carousel.vue';
import Image from '@/entities/image';

let images = ref(await getListPage());

console.log(images.value);

window.addEventListener("resize", function () {
  console.log(window.innerWidth);
});

const next = function () {
  const first = images.value!.shift();
  images.value = images.value!.concat(first as Image);
  console.log(images.value);
}
const previous = function () {
  const last = images.value!.pop()
  images.value = [last as Image].concat(images.value as Image[])
  console.log(images.value);
}
</script>

<template>
  <div class="jo mainContent">
    <Carousel :images="(images as Array<Image>)" @previousClick="previous" @nextClick="next"/>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital@1&display=swap');

#app {
  font-family: 'Josefin Sans', sans-serif;
}

header {
  line-height: 1.5;
}

.mainContent {
  display: flex;
  justify-content: center;
}
</style>
