<template>
  <div class="mt-4">
    <v-row
      no-gutters
    >
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :text="todo.text"
        :title="todo.title"
        :marked="todo.marked"
        @remove-todo="removeTodo(todo._id)"
        @mark-todo="markTodo(todo._id)"
      />
    </v-row>
  </div>
</template>

<script>

import TodoItem from './TodoItem'

export default {
  components: { TodoItem },
  props: { todos: Array[Object] },
  methods: {
    removeTodo(id) {
      this.$emit('remove-todo', id)
    },
    markTodo(id) {
      this.$emit('mark-todo', id)
    }
  }
}

</script>