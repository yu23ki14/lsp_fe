<template lang="pug">
  div
    .controller
      button(@click="predict")
        |追加
    div(v-for="image in images")
      img(src="image.image_path")
</template>

<script>

export default {
  data() {
    return {
      images: []
    }
  },
  methods: {
    async predict() {
      const params = {vector: [2.00, 3.00]}
      console.log(params)
      const response = await this.$axios.$post('/predict', params)
        .catch(err=>{
          return false
        });
      return this.show_generated_image(response)
    },
    
    show_generated_image(params) {
      const image_path = params.image_path
      this.images.push({
        image_path: image_path
      })
    }
  }
}
</script>

<style lang="sass">
</style>
