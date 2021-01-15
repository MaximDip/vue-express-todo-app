<template>
    <v-col>
      <v-card
        class="mt-2 mr-2"
        max-width="300"
      >
      <div class="d-flex align-center justify-space-between">
        <v-card-title>
            {{title}}
        </v-card-title>
        <v-btn
          icon
          color="orange"
          v-if="marked"
        >
          <v-icon>mdi-star</v-icon>
        </v-btn>

      </div>
        <v-card-actions>
          <v-btn
            color="primary lighten-1"
            text
            @click="$emit('mark-todo')"
          >
            Отметить
          </v-btn>

          <v-btn
            color="error lighten-1"
            text
            @click="$emit('remove-todo')"
          >
            Удалить
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{text || ''}}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
</template>

<script>

export default {
  props: {
    title: String,
    text: String,
    marked: Boolean
  },
  data: () => ({
    show: false
  }),
}

</script>