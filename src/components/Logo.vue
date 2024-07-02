<script setup>
const logo = new URL("/logo.png", import.meta.url).href;

const props = defineProps({
    width: {
        type: Number,
        default: 198,
    },
});
</script>

<template>
  <v-img :src="logo" :width="width"></v-img>
</template>
