<template lang="pug">
  .page-container.flex-container.flex-between
    .controller#controller(@click="predict")
      .controller-x-axis(v-for="n of 7", :style="{left: n*50 + 'px'}")
      .controller-y-axis(v-for="n of 7", :style="{top: n*50 + 'px'}")
      .controller-x
      .controller-y

    .image-container.flex-container
      .image-item.flex-container.flex-end(v-for="image in images")
        img(:src="image.image_path")
        p
          |position: {{image.vector}}
          br
          |model: vae_v1
          br
          |weight: train_20191108.h5
</template>

<script>

export default {
  data() {
    return {
      images: []
    }
  },
  methods: {
    predict: function (event) {
      var controller = document.getElementById( "controller" )
      var clientRect = controller.getBoundingClientRect()
      var cX = window.pageXOffset + clientRect.left;
      var cY = window.pageYOffset + clientRect.top;
      var clickX = event.pageX - cX
      var clickY = event.pageY - cY
      var x = Math.round(((clickX / 100) * 2 - 4) * 100) / 100
      var y = Math.round(((clickY / -100) * 2 + 4) * 100) / 100
      var vector = [x, y]
      this.get_prediction(vector)
    },
    
    async get_prediction(vector) {
      const params = {vector: vector}
      const response = await this.$axios.$post('/api/predict', params)
        .catch(err=>{
          return false
        });
      return this.show_generated_image(response, vector)
    },
    
    async set_weights() {
      const params = {}
    },
    
    show_generated_image(response, vector) {
      
      const path = response.image_path
      this.images.push({
        image_path: path,
        vector: vector
      })
    }
  }
}
</script>

<style lang="sass">
.page-container
  width: 1100px
  margin: 100px auto 0px
  
.flex-container
  display: flex

.flex-between
  justify-content: space-between
  
.flex-end
  align-items: flex-end

.controller
  width: 400px
  height: 400px
  border: 1px solid gray
  position: relative
  cursor: pointer
  
.controller-x-axis, .controller-y-axis
  position: absolute
  background: lightgray

.controller-x-axis
  top: 0
  width: 1px
  height: 400px

.controller-x
  &:before
    content: "-4"
    position: absolute
    left: 0px
    bottom: -30px
  &:after
    content: "4"
    position: absolute
    right: -10px
    bottom: -30px

.controller-y
  &:before
    content: "-4"
    position: absolute
    left: -25px
    bottom: 0px
  &:after
    content: "4"
    position: absolute
    left: -25px
    top: -10px
  
.controller-y-axis
  left: 0
  width: 400px
  height: 1px

.image-container
  width: 600px
  flex-direction: column-reverse
  
  img
    width: 250px
    margin-right: 50px

.image-item
  margin-bottom: 50px
  

</style>
