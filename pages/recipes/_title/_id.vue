<template>
  <div class="recipe-detail-page max-w-lg">
    <header class="flex flex-row justify-between">
      <div>
        <nuxt-link
          to="/"
          class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
        >
          back
        </nuxt-link>
      </div>
      <h1 class="text-4xl text-center mb-8">
        {{ title }}
      </h1>
      <div>
        <svg
          class="w-6 h-6 cursor-pointer"
          :class="favoriteCssClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          @click="handleFavoriteClick"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </header>
    <main class="mx-auto max-w-lg">
      <ul class="mb-8">
        <li
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
        >
          {{ ingredient }}
        </li>
      </ul>

      <p class="mb-20">
        {{ description }}
      </p>

      <div class="recipe-detail-page__buttons flex flex-row justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
          @click="deleteRecipe"
        >
          {{ deleteButtonText }}
        </button>

        <nuxt-link
          :to="`/edit-recipe/${recipe.id}`"
          class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
        >
          edit
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'RecipeDetailPage',
  async asyncData({ app, redirect, route }) {
    const { id } = route.params;

    try {
      const recipeRef = await app.$fire.firestore
        .collection('recipes')
        .doc(id);

      const recipe = await recipeRef.get();

      if (!recipe.exists) {
        console.error('No such recipe!');
        redirect('/');
      } else {
        return {
          recipe: recipe.data(),
          isFavorite: recipe.data().favorite,
          deletionInProgress: false,
        };
      }
      return null;
    } catch (error) {
      console.error(`Error while fetching recipe ${id}`, error);
      return null;
    }
  },
  computed: {
    deleteButtonText() {
      return this.deletionInProgress ? 'deleting...' : 'delete';
    },
    description() {
      return this.recipe.description;
    },
    favoriteCssClasses() {
      return this.isFavorite ? 'fill-current text-yellow-400' : '';
    },
    title() {
      return this.recipe.title;
    },
  },
  methods: {
    async deleteRecipe() {
      this.deletionInProgress = true;
      try {
        await this.$fire.firestore
          .collection('recipes')
          .doc(this.recipe.id)
          .delete();

        this.$router.push('/');
      } catch (error) {
        console.log(`Error while deleting: ${this.recipe.id}`, error);
        this.deletionInProgress = false;
      }
    },
    async handleFavoriteClick() {
      this.isFavorite = !this.isFavorite;

      try {
        await this.$fire.firestore
          .collection('recipes')
          .doc(this.recipe.id)
          .update({
            favorite: this.isFavorite,
          });
      } catch (error) {
        console.log(`Error while favoring: ${this.recipe.id}`, error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.recipe-detail-page {}

</style>
