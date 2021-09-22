<template>
  <div class="index">
    <div class="container mx-auto flex flex-col justify-center">
      <h1 class="text-4xl text-center font-bold">
        Our recipes
      </h1>
      <RecipeList
        :recipes="recipes"
        class="mt-8"
      />
      <div class="flex flex-row justify-end">
        <AddRecipeButton />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  async asyncData({ app }) {
    let recipes = [];

    try {
      const recipeSnapshots = await app.$fire.firestore
        .collection('recipes')
        .get();

      recipes = recipeSnapshots.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error while fetching data from firestore', error);
    }

    return {
      recipes,
    };
  },
};
</script>
