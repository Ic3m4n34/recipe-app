<template>
  <ul class="recipe-list">
    <RecipeInList
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </ul>
</template>

<script>
export default {
  name: 'RecipeList',
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

.recipe-list {}

</style>
