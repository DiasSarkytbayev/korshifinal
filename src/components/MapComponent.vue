<template>
  <l-map ref="map" v-model:zoom="zoom" :center="[43.25654, 76.92848]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-marker :lat-lng="[43.25654, 76.92848]" />
  </l-map>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { ref } from 'vue';

const zoom = ref(12);
</script>
