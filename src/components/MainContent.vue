<script setup lang="ts">

import { ref, computed } from 'vue';
import { getListPage } from '../api/images';
import Carousel from '../components/Carousel.vue';
import Image from '@/entities/image';

let images = ref(await getListPage());

const imagesSelected = computed(() => {
  return (images.value as Image[])
    .filter(image => image.isSelected)
    .sort((a, b) => {
      if (a.id as number > (b.id as number)) {
        return 1
      }
      else if (a.id as number < (b.id as number)) {
        return -1
      }
      else {
        return 0;
      }
    });
})

const next = function () {
  const first = images.value!.shift();
  images.value = images.value!.concat(first as Image);
}
const previous = function () {
  const last = images.value!.pop();
  images.value = [last as Image].concat(images.value as Image[]);
}
const selectImage = function (imageId: number) {
  const image = (images.value as Image[]).find(image => imageId == image.id) as Image;
  image!.isSelected = !image!.isSelected;
}
</script>

<template>
  <div class="jo mainContent">
    <Carousel :images="(images as Array<Image>)" @previousClick="previous" @nextClick="next" @imageClick="selectImage" />

    <TransitionGroup name="list" tag="ul" class="urlWrapper">
      <div class="fsize30" v-for="image in imagesSelected" :key="image.id">
        {{ image.url }}
      </div>
    </TransitionGroup>
</div></template>

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
  flex-direction: column;
  align-items: center;
}

.urlWrapper {
  padding: 0px;
  margin-top: 30px;
  line-height: 1.5;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
