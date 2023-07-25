<script lang="ts" setup>

import Image from '../entities/image';
import { ref, computed, watch, onUpdated } from 'vue';

let windowWidth = ref(window.visualViewport!.width);

const props = defineProps({
    images: Array<Image>
})

window.addEventListener("resize", function () {
    windowWidth.value = window.visualViewport!.width;
});

const imagesToShow = computed(() => {
    let numberOfImages = (windowWidth.value - 100) / 310;
    return props.images!.slice(0, numberOfImages);
})

const highlightImages = function () {
    const imageElements = document.getElementsByClassName("image");

    for (let i = 0; i < imageElements.length; i++) {
        imageElements[i].classList.remove("selected");
    }
    console.log(imagesToShow.value);
    imagesToShow.value.forEach(image => {
        if(image.isSelected) {
            const selectedElement = document.getElementById("image"+image.id);
            selectedElement?.classList.add("selected");
        }
    });
}
onUpdated(() => {
    highlightImages();
})
</script>

<template>
    <div class="carousel">
        <button class='previous round jo fsize30' @click="($event) => {
            $emit('previousClick')
        }">&#8592;
        </button>
        <transition-group class='carouselTransition' tag="div">
            <picture v-for="(image, index) in imagesToShow" :key="image.id" class="slide">
                <img :src="(image.download_url as string)" class="image" :id="`image`+image.id" @click="($event) => {
                    $emit('imageClick', image.id)
                    highlightImages();
                }" />
            </picture>
        </transition-group>
        <button class='next round jo fsize30' @click="($event) => {
            $emit('nextClick')
        }">&#8594;</button>
    </div>
</template>

<style>
.carousel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.slide {
    margin: 0px 5px 0px 5px;
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
    width: 300px;
    height: 200px;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    font-size: inherit;
    border: 0;
    line-height: 1;
    background: none;
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

.selected {
    outline: var(--outline);
    outline-offset: 2px;
    --clr: green;
}
</style>