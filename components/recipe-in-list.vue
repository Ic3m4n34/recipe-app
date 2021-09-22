<template>
  <li class="recipe-in-list relative p-4 bg-white rounded-md shadow-md mb-4">
    <article>
      <div class="absolute top-5 right-5">
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
      <nuxt-link
        :to="slug"
        class="block"
      >
        <h2 class="text-2xl mb-2">
          {{ recipe.title }}
        </h2>
        <p>
          {{ shortDescription }}
        </p>
      </nuxt-link>
    </article>
  </li>
</template>

<script>
export default {
  name: 'RecipeInList',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: this.recipe.favorite,
    };
  },
  computed: {
    favoriteCssClasses() {
      return this.isFavorite ? 'fill-current text-blue-500' : '';
    },
    shortDescription() {
      return this.recipe.description.length > 50 ? `${this.recipe.description.substring(0, 50)}...` : this.recipe.description;
    },
    slug() {
      return `/recipes/${this.recipe.title.replace(/\s/g, '-')}/${this.recipe.id}`;
    },
  },
  methods: {
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
