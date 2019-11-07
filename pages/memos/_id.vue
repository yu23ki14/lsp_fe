<template lang=pug>
  div
    .memo-wrapper
      .page-container.memo-container
        .memo-parent-container
          .memo-item
            .memo-title
              |{{memo.title}}
            .memo-main
              |{{memo.main}}
        
        ul.memo-children-container
          li
            .memo-relation-node
              .node
              .semantic-container
                p test test test test test test test test test test test test test test
            .memo-item
              .memo-title
                |{{memo.title}}
              .memo-main
                |{{memo.main}}
              
          li
            .memo-relation-node
              .node
              .semantic-container
                p test test test test test test test test test test test test test test
            .memo-item  
              .memo-title
                |{{memo.title}}
              .memo-main
                |{{memo.main}}
          
          li(@click="toggle_memo_relation_modal")
            .memo-relation-node
              .node
            .memo-item  
              .memo-title
                |新規追加 &#43;
                
    memo_relation
    
</template>

<script>
import memo_relation from '~/components/memo_relation.vue'

export default {
  components: {
    memo_relation
  },
  
  async asyncData({ $axios, params }) {
    const response = await $axios.$get("/memos/" + params.id)
      .catch( error => {
        console.log("response error", error)
        return false
      })
    return { memo: response}
  },
  
  methods: {
    toggle_memo_relation_modal() {
      this.$store.commit('modal/toggle_memo_relation_modal')
    }
  }
}

</script>

<style lang="sass" scoped>
.memo-wrapper
  padding: 30px 0
  background: #dcdcdc
  min-height: 100vh

.memo-container
  display: flex

.memo-item
  padding: 20px
  background-color: white
  border-left: 8px coral solid
  
.memo-title
  font-size: 19px
  
.memo-main
  padding-top: 10px
  white-space: pre-wrap
  word-wrap: break-word

.memo-reference
  font-size: 15px
  color: gray
  padding-top: 5px

.memo-parent-container
  width: 40%

.memo-children-container
  width: calc(60% - 20px)
  margin-left: 20px
  border-left: 5px gray solid
  li
    display: flex
    margin-bottom: 40px
    &:last-of-type
      margin-bottom: 0
      cursor: pointer
  .memo-item
    border-left-color: lightseagreen
    width: calc(100% - 230px)

.memo-relation-node
  width: 230px
  .node
    width: 90%
    height: 5px
    background: gray
    margin: 30px auto 20px 0
    position: relative
    &:after
      position: absolute
      content: " "
      width: 16px
      height: 16px
      border-radius: 8px
      background: gray
      top: -5px
      right: -8px
      
  .semantic-container
    width: 90%
    margin-left: 3%
    background: white
    padding: 10px
    font-size: 14px

</style>
