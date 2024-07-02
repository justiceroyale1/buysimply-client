<script setup>
const logo = "/logo.png";

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
