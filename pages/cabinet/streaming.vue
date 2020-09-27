<template>
  <div>
    <input v-model="text" type="text" @input="request" />
  </div>
</template>

<script>
export default {
  layout: 'cabinet',
  name: 'Streaming',
  data() {
    return {
      text: '',
      timer: null,
    }
  },
  methods: {
    request() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {}, 1000)
    },
  },
}
</script>

<style></style>
