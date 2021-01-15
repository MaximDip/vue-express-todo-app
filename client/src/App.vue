<template>
  <v-app>
    <v-card>
      <div class="header d-flex justify-space-between align-center">
        <div>
          <v-card-title>Todo App</v-card-title>
        </div>
        <div>
          <v-btn
            class="primary mr-2"
            @click="showFavorites"
            v-if="btns.allClicked"
          >Показать только отмеченные</v-btn>
          <v-btn
            class="success"
            @click="showAll"
            v-if="btns.favoritesClicked"
          >Показать все</v-btn>
        </div>
      </div>
    </v-card>
    <v-main>
      <v-container>
        <TodoCreateInput @create-todo="createTodo" />
        <div v-if="todos.length">
          <TodoList
            :todos="todos"
            @remove-todo="removeTodo"
            @mark-todo="markTodo"
          />
        </div>
        <h1 v-else class="mt-4">Нет задач</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList'
import TodoCreateInput from './components/TodoCreateInput'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoCreateInput,
  },
  data: () => ({
    todos: [],
    favorites: [],
    copy: [],
    btns: {
      allClicked: true,
      favoritesClicked: false
    }
  }),
  async mounted() {
    const data = await fetch('http://localhost:3000/api/todos', {
      method: 'GET'
    })
    const todos = await data.json()
    this.todos = todos
  },
  methods: {
    createTodo(todo) {
      if (todo) {
        this.todos.push(todo)
      }
    },
    async removeTodo(id) {
      await fetch('http://localhost:3000/api/todos/' + id, {
        method: 'DELETE'
      })
      this.todos = this.todos.filter(todo => todo._id !== id)
    },
    async markTodo(id) {
      const index = this.todos.findIndex(todo => todo._id === id)
      await fetch('http://localhost:3000/api/todos/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({marked: !this.todos[index].marked})
      })
      this.todos[index].marked = !this.todos[index].marked
    },
    showFavorites() {
      this.copy = [...this.todos]
      this.todos = this.favorites.filter(todo => todo.marked)
      this.btns.favoritesClicked = !this.btns.favoritesClicked
      this.btns.allClicked = !this.btns.allClicked
    },
    showAll() {
      this.todos = [...this.copy]
      this.btns.allClicked = !this.btns.allClicked
      this.btns.favoritesClicked = !this.btns.favoritesClicked
    }
  },
  watch: {
    todos() {
      this.favorites = [...this.todos]
    }
  }
}
</script>

<style scoped>
.header {
  padding: 0.5rem;
}
</style>