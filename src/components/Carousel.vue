<script lang="ts" setup>

import Image from '../entities/image';
import { ref, computed } from 'vue';

let windowWidth = ref(window.visualViewport!.width);

const props = defineProps({
    images: Array<Image>
})

window.addEventListener("resize", function () {
    windowWidth.value = window.visualViewport!.width;
    console.log(windowWidth);
});

const imagesToShow = computed(() => {
    let numberOfImages = (windowWidth.value - 100) / 310;
    return props.images!.slice(0, numberOfImages);
})
</script>

<template>
    <div class="carousel">
        <button class='previous round jo fsize30' @click="$emit('previousClick')">&#8592;</button>
        <transition-group class='carouselTransition' tag="div">
            <picture v-for="(image, index) in imagesToShow" :key="index" class="slide">
                <img :src="(image.download_url as string)" class="image" />
            </picture>
        </transition-group>
        <button class='next round jo fsize30' @click="$emit('nextClick')">&#8594;</button>
    </div>
</template>

<style>
.carousel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.slide {
    margin: 0px 5px 0px 5px;
}

.image {
    width: 300px;
    height: 200px;
}

.previous {
    background-color: #f1f1f1;
    color: black;
}

.next {
    background-color: #f1f1f1;
    color: black;
}

.round {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.carouselTransition {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

@media screen and (max-width: 719px) {
    .slide {
        margin: 0px;
    }

    .image {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .round {
        margin: 0px 5px 0px 5px;
    }
}

.image:hover {
    border-radius: 5px;
    border-color: gray;
    opacity: 0.8;
}

.image {
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
  border: 0;
  line-height: 1;
  background: none;
}

.image {
  --clr: #386397;
  --outline: 2px solid var(--clr);
  color: var(--clr);
  outline: var(--outline);
  border: var(--outline);
  outline-offset: -2px;
  transition: outline-offset 200ms ease;
}

.image:hover,
.image:focus {
  outline: var(--outline);
  outline-offset: 2px;
}
</style>