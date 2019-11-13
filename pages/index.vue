<template lang="pug">
  .page-container
    .weight-selector.flex-container
      h4
        |Weight
      select(id="weight", v-model="weight")
        option(v-for="weight in weights", :value="weight.value")
          |{{weight.name}}
      button(@click="set_weight")
        |SET
    .flex-container.flex-between
      .controller-container
        .controller#controller(@click="predict")
          .controller-x-axis(v-for="n of 7", :style="{left: n*50 + 'px'}")
          .controller-y-axis(v-for="n of 7", :style="{top: n*50 + 'px'}")
          .controller-x
          .controller-y
          .controller-morphing-checkpoint-container
            .controller-morphing-checkpoint(v-for="(checkpoint, index) in checkpoints", :style="{top: checkpoint.y + 'px', left: checkpoint.x + 'px'}")
              |{{index + 1}}
        .mode-changer
          button(@click="mode='single'", :style="{background: [mode == 'single' ? 'coral' : '']}")
            |single
          button(@click="mode='morphing'", :style="{background: [mode == 'morphing' ? 'coral': '']}")
            |morphing
        .morphing-controller(v-show="mode=='morphing'")
          button(@click="get_gif")
            |generate gif
          button(@click="checkpoints=[], checkpoints_vector=[]")
            |reset
      .image-container.flex-container
        .image-item.flex-container.flex-end(v-for="image in images")
          img(:src="image.image_path")
          p
            |position: {{image.vector}}
            br
            |model: vae_v1
            br
            |weight: {{image.weight}}
    
    .loading-container(v-show="loading")
      img(src="~/assets/images/loading.png")
</template>

<script>

export default {
  data() {
    return {
      images: [],
      mode: 'single',
      checkpoints: [],
      checkpoints_vector: [],
      weights: [],
      weight: 1,
      loading: false
    }
  },
  
  async asyncData({ $axios }) {
    const response = await $axios.$get("/api/weights")
      .catch( error => {
        console.log("response error", error)
        return false
      })
    var weight_params = []
    for (var i = 1; i < response.path.length; i++){
      weight_params.push({
        name: response.path[i].slice(8),
        path: response.path[i],
        value: i - 1
      })
    }
    return { weights: weight_params}
  },
  
  methods: {
    predict: function (event) {
      const controller = document.getElementById( "controller" )
      const clientRect = controller.getBoundingClientRect()
      const cX = window.pageXOffset + clientRect.left;
      const cY = window.pageYOffset + clientRect.top;
      const clickX = event.pageX - cX
      const clickY = event.pageY - cY
      const x = Math.round(((clickX / 100) * 2 - 4) * 100) / 100
      const y = Math.round(((clickY / -100) * 2 + 4) * 100) / 100
      const vector = [x, y]
      
      if (this.mode == 'single') {
        this.get_prediction(vector)
      } else if (this.mode == 'morphing') {
        var point = [clickX - 10, clickY - 10]
        this.drop_checkpoint(vector, point)
      }
        
    },
    
    drop_checkpoint(vector, point) {
      if (this.checkpoints.length < 5) {
        this.checkpoints.push({
          x: point[0],
          y: point[1]
        })
        this.checkpoints_vector.push({
          vector: vector
        })
      }
    },
    
    async get_prediction(vector) {
      const params = {vector: vector}
      this.loading = true
      const response = await this.$axios.$post('/api/predict', params)
        .catch(err=>{
          return false
        });
      this.loading = false
      return this.show_generated_image(response, vector)
    },
    
    async get_gif(){
      const params = {checkpoints: this.checkpoints_vector}
      this.loading = true
      const response = await this.$axios.$post('/api/gif', params)
        .catch(err=>{
          return false
        });
      this.loading = false
      return this.show_generated_image(response, params)
    },
    
    async set_weight() {
      const params = {path: this.weights[this.weight].path}
      this.loading = true
      const response = await this.$axios.$post('/api/set_weight', params)
        .catch(err=>{
          return false
        });
      this.loading = false
      return
    },
    
    show_generated_image(response, vector) {
      
      const path = response.image_path
      this.images.push({
        image_path: path,
        vector: vector,
        weight: this.weights[this.weight].name
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

.weight-selector
  margin-bottom: 30px
  
  select
    font-size: 14px
    margin-left: 10px
    width: 200px
  
  button
    background-color: #cecece
    margin-left: 5px

.mode-changer
  margin-top: 50px
  
  button
    background: rgba(#ff7f50, .4)
    min-width: 100px

.controller
  width: 400px
  height: 400px
  border: 1px solid gray
  position: relative
  cursor: pointer

.controller-morphing-checkpoint-container
  .controller-morphing-checkpoint
    position: absolute
    width: 20px
    height: 20px
    border-radius: 10px
    font-size: 12px
    display: flex
    justify-content: center
    align-items: center
    &:nth-of-type(1)
      background: #4ee2ce
    &:nth-of-type(2)
      background: #b0e24e
    &:nth-of-type(3)
      background: #ffda72
    &:nth-of-type(4)
      background: #6087f3
    &:nth-of-type(5)
      background: #ff8cfb

.morphing-controller
  margin-top: 15px
  
  button
    background: rgba(#6495ed, .4)
    min-width: 100px
    &:hover
      background: #6495ed
    
  
.controller-x-axis, .controller-y-axis
  position: absolute

.controller-x-axis
  top: 0
  width: 1px
  height: 400px
  border-right: 1px dashed lightgray

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
  border-bottom: 1px dashed lightgray

.image-container
  width: 600px
  flex-direction: column-reverse
  
  img
    width: 250px
    margin-right: 50px

.image-item
  margin-bottom: 50px
  
@keyframes loadingAnimation
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)

@-webkit-keyframes loadingAnimation
  0%
    -webkit-transform: rotate(0deg)

  100%
    -webkit-transform: rotate(360deg)
  
  
@-moz-keyframes loadingAnimation
  0%
    -moz-transform: rotate(0deg)

  100%
    -moz-transform: rotate(360deg)
  
.loading-container
  width: 100vw
  height: 100vh
  background-color: rgba(0,0,0,.4)
  position: fixed
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
  
  img
    width: 80px
    height: 80px
    animation-name: loadingAnimation
    animation-iteration-count: infinite
    animation-duration: 3s
    -webkit-animation-name: loadingAnimation
    -webkit-animation-iteration-count: infinite
    -webkit-animation-duration: 3s
    -moz-animation-name: loadingAnimation
    -moz-animation-iteration-count: infinite
    -moz-animation-duration: 3s

</style>
