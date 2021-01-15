<template>
  <v-card class="input">
    <form @submit.prevent="createTodo">
      <v-text-field
        v-model="title"
        label="Название Заметки"
        required
      ></v-text-field>
      <v-text-field
        v-model="text"
        label="Текст Заметки"
      ></v-text-field>
      <v-btn
        type="submit"
        class="mr-4 primary"
      >
        Создать
      </v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    title: '',
    text: ''
  }),
  methods: {
    async createTodo() {
      if (this.canCreate) {
        const title = this.title.trim()
        const text = this.text.trim()

        const res = await fetch('http://localhost:3000/api/todos', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title,
            text
          })
        })
        const data = await res.json()
        const newTodo = data.todo

        this.$emit('create-todo', newTodo)
        this.title = ''
        this.text = ''
      }
    }
  },
  computed: {
    canCreate() {
      return !!this.title.trim()
    }
  }
}
</script>

<style scoped>
.input {
  padding: 1rem;
}
</style>