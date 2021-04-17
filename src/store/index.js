import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists');

const store = new Vuex.Store({
  state: {
    // localStorageにはJSON形式の文字列型でデータが保存。その為parseでオブジェクトに変換
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' },
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    // 第一引数でstate
    // 第二引数ではコミット時に受け取る引数payloadを指定できる
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: []})
    },

    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    }
  },
  actions: {
    // 第一引数にcontextというストアインスタンスのメソッドやプロパティを呼び出せるオブジェクト
    // 第二引数には、mutationsに渡す引数を指定
    addlist(context, payload) {
      context.commit('addlist', payload)
    },

    removelist(context, payload) {
      context.commit('removelist', payload)
    }
  },
  getters: {
  }
})
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばる
store.subscribe((mutation, state) => {
    localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
