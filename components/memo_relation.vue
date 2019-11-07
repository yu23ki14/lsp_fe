<template lang=pug>
  .memo-relation-modal(v-if="relation_modal")
    .modal-backdrop
    .memo-relation-form-wrapper
      .memo-relation-form-container
        memo_relation_form

</template>

<script>
import memo_relation_form from '~/components/memo_relation_form.vue'

export default {
  
  components: {
    memo_relation_form
  },
  data() {
    return {
      relation_modal: this.$store.state.modal.memo_relation_modal
    }
  }
}

</script>

<style lang="sass" scoped>
    
.memo-relation-modal
  display: flex
  justify-content: center
  position: fixed
  height: 100vh
  width: 100%
  top: 10vh
  left: 0

.memo-relation-form-wrapper
  width: 500px
  height: 400px
  position: absolute
  z-index: 1000
  border-radius: 10px
  overflow: auto
  background-color: white

.memo-relation-form-container
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
