<template>
  <main class="new-recipe container mx-auto max-w-lg">
    <h1 class="text-4xl text-center mb-8">
      Add new recipe
    </h1>
    <input
      v-model="title"
      placeholder="Title"
      class="w-full border border-gray-300 rounded-md p-2 mb-2"
    />
    <div class="new-recipe__ingredients flex flex-col">
      <input
        v-for="(ingredient, index) in ingredients"
        :key="index"
        ref="ingredients"
        v-model="ingredients[index]"
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
      <textarea
        v-model="description"
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
      return this.saving ? 'saving...' : 'save';
    },
    formValid() {
      return this.title.length > 2 && this.ingredients.length > 0 && this.description.length > 4;
    },
  },
  mounted() {
    console.log(this.$refs);
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

        try {
          await this.$fire.firestore
            .collection('recipes')
            .doc(recipeId)
            .set({
              id: recipeId,
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

.new-recipe {}

</style>
