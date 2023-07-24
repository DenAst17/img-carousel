<script setup lang="ts">
import MainContent from "./components/MainContent.vue";
</script>

<template>
  <Suspense>
    <MainContent />
  </Suspense>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital@1&display=swap');

#app {
  font-family: 'Josefin Sans', sans-serif;
}

header {
  line-height: 1.5;
}
</style>
