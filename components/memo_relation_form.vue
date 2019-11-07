<template lang=pug>
  form(@submit.prevent="add_memo_relation")
    ul
      li
        label(for="search_single_title")
          |紐づけるメモ
        .memo-relation-form-search-input
          input(type="text" v-model="title" id="search_single_title" placeholder="検索するメモのタイトルを入力")
          span.memo-relation-advanced-search
      li
        label(for="semantic")
          |紐づけの意図
        textarea(v-model="semantic" id="semantic")
    input(type="hidden" v-model="connection")
    .memo-submit-controller
      button.memo-submit-button(type="submit")
        |追加
</template>

<script>
export default {
  data() {
    return {
      parent_memo_id: this.$route.params.id,
      child_memo_id: null,
      semantic: ""
    }
  },
  methods: {
    async add_memo_relation() {
      const params = {title: this.title, main: this.main, reference: this.reference}
      const response = await this.$axios.$post('/memos', params)
        .catch(err => {
          return this.notify_submit('fail')
        });
      return this.notify_submit('success')
    }
  }
}

</script>

<style lang="sass" scoped>
label
  display: block
  margin-bottom: 5px
  font-weight: 700
  color: gray
  font-size: 19px
  
input, textarea
  font-size: 17px
  
ul
  padding: 20px 20px 40px 20px

li
  margin-bottom: 20px
  
input[type="text"], textarea
  width: 100%
  border: none
  border-bottom: 1px solid gray
  padding: 3px 0
  
textarea
  min-height: 100px
  resize: none

.memo-submit-controller
  width: 100%
  position: absolute
  bottom: 0
  left: 0

  button
    width: 100%
    padding: 10px
    border: none
    cursor: pointer
    font-weight: 700
    background-color: lightseagreen
    color: white
    &:focus, &:hover
      background-color: coral

.memo-relation-form-search-input
  display: flex
  align-items: center
  
  input
    width: calc(100% - 30px)
    margin-right: 10px

.memo-relation-advanced-search
  width: 20px
  height: 20px
  border-radius: 10px
  border: 1px gray solid
  cursor: pointer
  display: flex
  justify-content: center
  align-items: center
  &:before, &:after
    content: " "
    background: gray
    position: absolute
  &:before
    width: 10px
    height: 1px
  &:after
    width: 1px
    height: 10px

</style>
