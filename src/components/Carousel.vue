<script lang="ts" setup>

import Image from '../entities/image';
import { computed } from 'vue';

const props = defineProps({
    images: Array<Image>
})

const imagesToShow = computed(() => {
    return props.images!.slice(0, 5);
})
</script>

<template>
    <div class="mainContent">
        <button class='previous round' @click="$emit('previousClick')">&#8249;</button>
        <transition-group class='carousel' tag="div">
            <picture v-for="(image, index) in imagesToShow" :key="index" class="slide">
                <img :src="(image.download_url as string)" class="image" />
            </picture>
        </transition-group>
        <button class='next round' @click="$emit('nextClick')">&#8250;</button>
    </div>
</template>

<style>
.mainContent {
    display: flex;
    flex-direction: row;
    align-items: center;
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
</style>