<template lang=pug>
  .memo-new-wrapper
    .memo-new-container
      memo_form
</template>

<script>
import memo_form from '~/components/memo_form.vue'

export default {
  components: {
    memo_form
  }
}

</script>

<style lang="sass">
.memo-new-wrapper
  display: flex
  justify-content: center
  margin-top: 30px
.memo-new-container
  width: 40%
  position: relative
  ul
    padding: 0
  .memo-submit-controller
    position: relative
</style>
