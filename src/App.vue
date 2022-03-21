<template>
  <div class="container">
    <h2 class="py-2 mb-0 pb-0"><b>model</b></h2>
    <div style="margin-top: -7px;">management</div>
    <router-view /> <!-- all SPA routes/components -->
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Detailed from './components/Detailed.vue';


export default {
  name: 'app',
  components: {
    Home,
    Detailed
  }
}
</script>

<style>

</style>
