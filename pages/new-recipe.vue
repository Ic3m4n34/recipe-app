<template>
  <main class="new-recipe">
    <h1 class="text-4xl text-center font-bold mb-8">
      Add new recipe
    </h1>

    <h2 class="text-2xl mb-2">
      Title
    </h2>
    <input
      v-model="title"
      placeholder="Title"
      class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <h2 class="text-2xl mt-4 mb-2">
      Ingredients
    </h2>
    <div class="new-recipe__ingredients flex flex-col">
      <input
        v-for="(ingredient, index) in ingredients"
        :key="index"
        ref="ingredients"
        v-model="ingredients[index]"
        placeholder="Ingredient"
        class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <h2 class="text-2xl mt-4 mb-2">
        Description
      </h2>
      <textarea
        v-model="description"
        placeholder="Description"
        rows="5"
        class="w-full border border-gray-300 rounded-md p-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @keyup.enter="saveNewRecipe"
      />
    </div>
    <div class="new-recipe__buttons flex flex-row justify-between">
      <nuxt-link
        to="/"
        class="bg-blue-500 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-md"
      >
        Back
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
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'NewRecipe',
  data() {
    return {
      title: '',
      ingredients: [
        '',
      ],
      description: '',
      saving: false,
    };
  },
  computed: {
    saveButtonText() {
      return this.saving ? 'saving...' : 'Save';
    },
    formValid() {
      return this.title.length > 2 && this.ingredients.length > 0 && this.description.length > 4;
    },
  },
  methods: {
    async addNewIngredient() {
      const lastIngredientElement = this.ingredients[this.ingredients.length - 1];
      const lastIngredientEmtpy = lastIngredientElement.length === 0;
      if (lastIngredientEmtpy) {
        this.$refs.ingredients[this.ingredients.length - 1].focus();
      } else {
        this.ingredients.push('');
        await this.$nextTick();
        this.$refs.ingredients[this.ingredients.length - 1].focus();
      }
    },
    async saveNewRecipe() {
      if (this.formValid) {
        this.saving = true;
        const recipeId = uuidv4();
        const timestamp = +new Date();
        const ingredients = this.ingredients.filter((ingredient) => ingredient.length > 0);

        try {
          await this.$fire.firestore
            .collection('recipes')
            .doc(recipeId)
            .set({
              id: recipeId,
              title: this.title,
              ingredients,
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
