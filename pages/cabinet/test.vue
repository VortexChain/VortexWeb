<template>
  <split style="height: 100%;" direction="vertical" @onDrag="setSize">
    <split-area :size="20">
      <sui-button @click="$refs.terminal.openConnection('tab')"
        >Add tab</sui-button
      >
    </split-area>
    <split-area :size="40">
      <terminal ref="terminal" />
    </split-area>
    <split-area ref="bottomPanel" :size="40">
      <editor :height="bottomPanelHeight" :width="bottomPanelWidth" />
    </split-area>
  </split>
</template>

<script>
export default {
  layout: 'cabinet',
  data: () => ({
    bottomPanelHeight: 0,
    bottomPanelWidth: 0,
  }),
  mounted() {
    this.setSize()
    window.addEventListener('resize', this.setSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSize)
  },
  methods: {
    setSize() {
      const panel = this.$refs.bottomPanel.$el
      this.bottomPanelHeight = panel.offsetHeight
      this.bottomPanelWidth = panel.offsetWidth
    },
  },
}
</script>

<style lang="less">
.gutter {
  cursor: ns-resize;
  background-color: rgb(116, 116, 116);
}
</style>
