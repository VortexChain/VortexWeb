<template>
  <div>
    <tabs :tabs="connections" @closeTab="closeConnection" />
  </div>
</template>

<script>
export default {
  data: () => ({
    connections: ['tab1'],
  }),
  methods: {
    closeConnection(index) {
      this.connections = this.connections.filter((x, i) => i !== index)
    },
    openConnection(name) {
      this.connections.push(name)
    },
  },
}
</script>

<style></style>
