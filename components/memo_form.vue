<template lang=pug>
  form(@submit.prevent="add_memo")
    ul
      li
        label(for="title")
          |タイトル
        input(type="text" v-model="title" id="title")
      li
        label(for="main")
          |内容
        textarea(v-model="main" id="main")
      li
        label(for="file")
          |添付ファイル(画像、音声ファイル)
          br
          span.memo-form-attachment-icon
            |+
          span.memo-form-attachment-name
            |{{file_name}}
        input(type="file" :multiple="false" @change="file_selected($event)" id="file")
      li
        label(for="reference")
          |参照
        input(type="text" v-model="reference" id="reference")
    input(type="hidden" v-model="connection")
    .memo-submit-controller
      button.memo-submit-button(type="submit")
        |追加
    .memo-submit-notification-container(v-if="submit_status")
      .memo-submit-notification
        |{{submit_status_text}}
</template>

<script>
export default {
  data() {
    return {
      title: "",
      main: "",
      reference: "",
      connection: "",
      attachment_file: null,
      file_name: "",
      submit_status: false,
      submit_status_text: ""
    }
  },
  methods: {
    file_selected: function (event) {
      const file = (event.target.files || event.dataTransfer.files)[0]
      this.attachment_file = file
      this.file_name = file.name
    },
    async add_memo() {
      const params = {title: this.title, main: this.main, reference: this.reference}
      const response = await this.$axios.$post('/memos', params)
        .catch(err => {
          return this.notify_submit('fail')
        });
      return this.notify_submit('success')
    },
    notify_submit(status) {
      if (status == "success") {
        this.reset_form_data()
        this.submit_status = true
        this.submit_status_text = "メモが保存されました"
      } else {
        this.submit_status = true
        this.submit_status_text = "予期せぬエラーが発生しました"
      }
    },
    reset_form_data() {
      this.title = ""
      this.main = ""
      this.reference = ""
      this.connection = ""
      this.attachment_file = ""
      this.file_name = ""
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
  
.memo-form-attachment-icon
  color: white
  display: inline-block
  width: 50px
  height: 30px
  background-color: gray
  border-radius: 5px
  font-size: 20px
  text-align: center
  line-height: 30px
  cursor: pointer
  margin-top: 5px
  
.memo-form-attachment-name
  font-weight: 400
  margin-left: 10px
  
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
  
input[type="file"]
  display: none
  
textarea
  min-height: 250px
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

.memo-submit-notification-container
  position: fixed
  right: 30px
  bottom: 30px
  background: coral
  color: white
  padding: 5px 10px
  border-radius: 5px

</style>
