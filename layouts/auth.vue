<template>
  <div>
    <client-only>
      <vue-particles class="particles" :click-effect="false" color="#fff" />
    </client-only>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style lang="less" scoped>
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

main {
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="less" scoped>
.light-mode {
  main {
    @apply bg-teal-500;
  }
}

.dark-mode {
  main {
    @apply bg-teal-600;
    color: @text-color-dark;
  }
}
</style>
