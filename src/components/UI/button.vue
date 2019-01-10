<template>
  <div>
    <router-link 
    v-if="type === 'link'"
    :to="linkTo"
    :class="['button_default']">
      <slot />
    </router-link>

    <div v-if="type === 'btn'">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['linkTo', 'link']
  }
</script>

<style scoped>

</style>