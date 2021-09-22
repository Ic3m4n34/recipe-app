<template>
  <div class="layout layout--default bg-green-100 p-4 md:p-8">
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaulLayout',
  head() {
    return {
      title: 'My Recipe App',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Here you find all of our delicious recipes. Check out our awesome recipes now!',
        },
      ],
    };
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: 'Roboto', serif;
  color: #1f2937;
  font-weight: 400;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.layout--default {
  min-height: 100vh;
  height: 100%;
}


</style>
