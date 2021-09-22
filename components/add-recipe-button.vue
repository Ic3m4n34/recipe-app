<template>
  <nuxt-link
    to="/new-recipe"
    class="add-recipe-button bg-blue-500 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
  >
    add new recipe
  </nuxt-link>
</template>

<script>
export default {
  name: 'AddRecipeButton',

};
</script>

<style lang="scss" scoped>

.add-recipe-button {}

</style>
