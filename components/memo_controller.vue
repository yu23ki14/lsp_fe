<template lang=pug>
  div
    .memo-controller
      .opener(@click="controller_single_click" @dblclick="controller_double_click")
    .memo-modal(v-show="memo_modal")
      .modal-backdrop(@click="memo_modal = false")
      .memo-form-wrapper
        .memo-form-container
          memo_form

</template>

<script>
import memo_form from '~/components/memo_form.vue'

export default {
  
  components: {
    memo_form
  },
  data() {
    return {
      memo_modal: false,
      controller_flag: false
    }
  },
  methods: {
    controller_single_click: function (event) {
      setTimeout(this.open_memo_modal, 500)
    },
    controller_double_click: function (event) {
      this.controller_flag = true
      this.$router.push('./memos/new')
      setTimeout(this.falsing_controller_flag, 501)
    },
    open_memo_modal: function(event){
      if (this.controller_flag == false) {
        this.memo_modal = true;
      }
    },
    falsing_controller_flag: function(event){
      this.controller_flag = false
    }
  }
}

</script>

<style lang="sass" scoped>

.opener
  width: 40px
  height: 40px
  background: lightseagreen
  border-radius: 30px
  position: fixed
  bottom: 30px
  right: 30px
  cursor: pointer
  display: flex
  justify-content: center
  align-items: center
  &:before, &:after
    content: " "
    background: white
    position: absolute
    border-radius: 3px
  &:before
    width: 20px
    height: 3px
  &:after
    width: 3px
    height: 20px
    
.memo-modal
  display: flex
  justify-content: center
  position: fixed
  height: 100vh
  width: 100%
  top: 10vh
  left: 0

.memo-form-wrapper
  width: 500px
  height: 80vh
  position: absolute
  z-index: 1000
  border-radius: 10px
  overflow: auto
  background-color: white

.memo-form-container
  width: 100%
  height: 100%
  overflow: auto
  &::-webkit-scrollbar
    display: none

.modal-backdrop
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgba(black, .5)

</style>
