<template lang=pug>
  header
    .logo
      |HackEditor
    ul
      li
        nuxt-link(to="/")
          |ダッシュボード
      li
        nuxt-link(to="/memos")
          |メモ一覧
</template>

<style lang="sass" scoped>
header
  background: white
  font-weight: 700
  display: flex
  align-items: center
  justify-content: space-between
  box-shadow: 0px 0px 3px gray

.logo
  font-size: 30px
  padding-left: 10px

ul
  display: flex
  align-items: center
  li
    display: inline-block
    a
      width: 100%
      display: block
      padding: 15px 10px
    &:hover
      background-color: lightseagreen
      a
        color: white

</style>
