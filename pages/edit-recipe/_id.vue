<template>
  <main class="edit-recipe">
    <h1 class="text-4xl text-center mb-8">
      Edit
    </h1>
    <h2 class="text-2xl mb-2">
      Title
    </h2>
    <input
      v-model="recipe.title"
      placeholder="Title"
      class="w-full border border-gray-300 rounded-md p-2 mb-2"
    />
    <h2 class="text-2xl mt-8 mb-2">
      Ingredients
    </h2>
    <div class="new-recipe__ingredients flex flex-col">
      <input
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
        ref="ingredients"
        v-model="recipe.ingredients[index]"
        placeholder="Ingredient"
        class="w-full border border-gray-300 rounded-md p-2 mb-2"
        @keyup.enter="addNewIngredient"
      />
      <div class="flex flex-row justify-end mb-4">
        <button
          class="text-sm bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          @click="addNewIngredient"
        >
          add new ingredient
        </button>
      </div>

      <h2 class="text-2xl mt-8 mb-2">
        Description
      </h2>
      <textarea
        v-model="recipe.description"
        placeholder="Description"
        rows="5"
        class="w-full border border-gray-300 rounded-md p-2 mb-8"
      />
    </div>
    <div class="new-recipe__buttons flex flex-row justify-between">
      <nuxt-link
        to="/"
        class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
      >
        back
      </nuxt-link>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
        @click="saveNewRecipe"
      >
        {{ saveButtonText }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'EditRecipe',
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
          saving: false,
        };
      }
      return null;
    } catch (error) {
      console.error(`Error while fetching recipe ${id}`, error);
      return null;
    }
  },
  computed: {
    saveButtonText() {
      return this.saving ? 'saving...' : 'save';
    },
    formValid() {
      return this.recipe.title.length > 2 && this.recipe.ingredients.length > 0 && this.recipe.description.length > 4;
    },
  },
  methods: {
    addNewIngredient() {
      /* console.log('l', this.ingredients[this.ingredients.length - 1]);
      const lastIngredientEmtpy = this.ingredients[this.ingredients.length - 1].length === null || this.ingredients[this.ingredients.length - 1].length === '';
      if (lastIngredientEmtpy) {
        this.$refs.ingredients[0].focus();
      } */
      this.ingredients.push('');
    },
    async saveNewRecipe() {
      if (this.formValid) {
        this.saving = true;
        const timestamp = +new Date();

        try {
          await this.$fire.firestore
            .collection('recipes')
            .doc(this.recipe.id)
            .set({
              id: this.recipe.id,
              title: this.title,
              ingredients: this.ingredients,
              description: this.description,
              favorite: false,
              createdAt: timestamp,
            });

          console.info('🍕 recipe added');
          this.$router.push('/');
        } catch (error) {
          console.error('Error while writing data to firestore', error);
          this.saving = false;
        }
      } else {
        console.error('form invalid');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.edit-recipe {}

</style>
