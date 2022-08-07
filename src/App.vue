<template>
  <div>
    <Header></Header>
  </div>
  <router-view/>
</template>

<style>

</style>

<script>
import Header from './components/Header.vue'
export default {
  name:"Layout",
  components: {
    Header
  }
}
</script>

