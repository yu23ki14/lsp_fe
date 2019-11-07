export const state = () => ({
  memo_modal: false,
  memo_relation_modal: false
})

export const mutations = {
  toggle_memo_modal (state, modal) {
    modal.memo_modal = !modal.memo_modal
  },
  toggle_memo_relation_modal (state, modal) {
    modal.memo_relation_modal = !modal.memo_relation_modal
  }
}