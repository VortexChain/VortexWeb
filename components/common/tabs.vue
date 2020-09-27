<template>
  <div>
    <!-- <div class="tabs"> -->
    <overlay-scrollbars
      class="tabs"
      :options="{
        scrollbars: { autoHide: 'scroll' },
      }"
    >
      <div class="tabs-wrapper">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :class="index === activeTab ? 'active' : ''"
          @click="selectTab(index)"
        >
          {{ tab }}
          <span
            class="ml-2 mdi mdi-close close-button"
            @click="closeTab(index)"
          ></span>
        </div>
      </div>
    </overlay-scrollbars>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    activeTab: null,
  }),
  methods: {
    closeTab(index) {
      this.$emit('closeTab', index)
    },
    selectTab(index) {
      this.activeTab = index
    },
  },
}
</script>

<style lang="less" scoped>
.tabs {
  width: 100%;
  background: #12171f;
  position: relative;
  overflow: hidden;
  height: 35px;

  .tabs-wrapper {
    white-space: nowrap;
    position: absolute;

    .tab-item {
      height: 35px;
      background: rgb(37, 45, 59);
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      color: white;
      cursor: pointer;
      user-select: none;

      &.active {
        background: rgb(55, 67, 88);
      }

      .close-button {
        transition: 0.1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>

<style lang="less">
.tabs {
  .os-scrollbar,
  .os-scrollbar-track,
  .os-scrollbar-handle {
    height: 3px !important;
    border-radius: 0 !important;
  }
  .os-scrollbar {
    padding: 0 !important;
  }
  .os-scrollbar-handle {
    background-color: rgb(92, 92, 92) !important;
  }
}
</style>
