<template>
  <div class="flex-1">
    <MonacoEditor
      :height="height"
      :width="width"
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue'

export default {
  components: {
    MonacoEditor,
  },
  props: {
    height: Number,
    width: Number,
  },
  data() {
    return {
      options: {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
          '\n'
        ),
      },
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
  },
}
</script>

<style lang="less" scoped></style>
