<template>
  <div class="flex h-screen w-screen">
    <div class="flex flex-col">
      <div class="tile-menu flex flex-wrap">
        <nuxt-link :to="localePath('index')">
          <div class="tile-menu-item bg-teal-700">
            <span class="mdi mdi-home"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-profile')">
          <div class="tile-menu-item bg-teal-600">
            <span class="mdi mdi-account"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-subscriptions')">
          <div class="tile-menu-item bg-teal-500">
            <span class="mdi mdi-pan"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-settings')">
          <div class="tile-menu-item bg-teal-600">
            <span class="mdi mdi-cog"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-terminal')">
          <div class="tile-menu-item bg-teal-500">
            <span class="mdi mdi-console-line"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-test')">
          <div class="tile-menu-item bg-teal-400">
            <span class="mdi mdi-code-tags"></span>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('cabinet-streaming')">
          <div class="tile-menu-item bg-teal-500">
            <span class="mdi mdi-google-podcast"></span>
          </div>
        </nuxt-link>
        <div class="tile-menu-item bg-teal-400"></div>
        <div class="tile-menu-item bg-teal-300" @click="$fireAuth.signOut()">
          <span class="mdi mdi-logout-variant"></span>
        </div>
      </div>
      <div class="flex-1 sub-menu"></div>
    </div>
    <main class="flex-1" style="width: calc(100vw - 420px);">
      <nuxt keep-alive />
    </main>
  </div>
</template>

<script>
export default {
  name: 'CabinetLayout',
}
</script>

<style lang="less" scoped>
.tile-menu {
  height: 420px;
  width: 420px;

  .tile-menu-item {
    height: 140px;
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
      z-index: 1;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>

<style lang="less">
.dark-mode {
  .sub-menu {
    background-color: #242424;
  }
  body {
    background-color: #363636;
  }
}
</style>
