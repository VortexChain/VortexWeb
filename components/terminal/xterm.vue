<template>
  <div ref="terminal"></div>
</template>

<script>
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import * as XtermWebfont from 'xterm-webfont'

export default {
  props: {
    sshUserId: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      terminal: null,
      socket: null,
      shellprompt: '$ ',
      fitAddon: null,
    }
  },
  watch: {
    sshUserId() {
      if (this.terminal) {
        this.terminal.dispose()
        this.terminal = null
      }
      if (this.sshUserId) {
        this.connect()
      }
    },
  },
  mounted() {
    if (this.sshUserId) {
      this.connect()
    }

    if (process.browser) {
      window.onresize = this.fit
    }
  },
  beforeDestroy() {
    console.log('Terminal for user ' + this.sshUserId + ' will be destroyed')
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    if (process.browser) {
      window.onresize = null
    }
  },
  methods: {
    connect() {
      this.terminal = new Terminal({
        fontFamily: 'JetBrains Mono',
        fontSize: 13,
        theme: { background: '#1a202c' },
      })

      this.terminal.loadAddon(new XtermWebfont())

      this.fitAddon = new FitAddon()
      this.terminal.loadAddon(this.fitAddon)
      this.terminal.loadWebfontAndOpen(this.$refs.terminal)
      this.fitAddon.fit()

      // Connect socket
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://'
      const port = location.port ? `:${location.port}` : ''
      const socketUrl = `${protocol}${location.hostname}${port}/shell?sshUserId=${this.sshUserId}`
      this.socket = new WebSocket(socketUrl)

      // Attach socket to terminal
      this.socket.onopen = (ev) => {
        const attachAddon = new AttachAddon(this.socket)
        this.terminal.loadAddon(attachAddon)
      }
    },
    fit() {
      this.fitAddon.fit()
      this.socket.send(
        JSON.stringify({
          command: 'resize',
          ptySafeCommand: true,
          data: {
            cols: this.terminal.cols,
            rows: this.terminal.rows,
          },
        })
      )
    },
    reconnect() {
      if (this.socket) {
        this.socket.close()
        this.socket == null
      }
      // Connect socket
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://'
      const port = location.port ? `:${location.port}` : ''
      const socketUrl = `${protocol}${location.hostname}${port}/shell?sshUserId=${this.sshUserId}`
      this.socket = new WebSocket(socketUrl)

      // Attach socket to terminal
      this.socket.onopen = (ev) => {
        const attachAddon = new AttachAddon(this.socket)
        this.terminal.loadAddon(attachAddon)
      }
    },
  },
}
</script>

<style>
@import 'xterm/css/xterm.css';
.terminal.xterm {
  padding: 10px;
}
</style>
