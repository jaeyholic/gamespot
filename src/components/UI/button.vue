<template>
  <div>
    <router-link
      v-if="type === 'link'"
      :to="linkTo"
      :class="['button_default']">
      <slot />
    </router-link>
    <div 
      v-if="type === 'btn'"
      :class="['button_default']">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['linkTo', 'type']
  }
</script>

<style scoped>

</style>