<template lang=pug>
  .memos-container
    ul.page-container
      li.memo-item(v-for="memo in memos")
        h2.memo-title {{memo.title}}
        p.memo-main {{memo.main}}
        p.memo-reference 参照：{{memo.reference}} {{memo.reference_other_details}}
        nuxt-link(:to="{name:'memos-id',params:{id:memo.id}}")
      
</template>

<script>

export default {
  data() {
    memos: null
  },
  
  async asyncData({ $axios }) {
    const response = await $axios.$get("/memos")
      .catch( error => {
        console.log("response error", error)
        return false
      })
    return { memos: response}
  }
}

</script>

<style lang="sass" scoped>
.memos-container
  padding: 10px 0
  background: #dcdcdc
  min-height: 100vh

.memo-item
  padding: 20px
  background-color: white
  border-left: 8px coral solid
  margin-bottom: 10px
  position: relative
  &:nth-of-type(2n)
    border-left-color: lightseagreen
  a
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
  
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
  
</style>
