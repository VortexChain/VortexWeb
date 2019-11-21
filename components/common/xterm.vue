<template>
  <div ref="terminal"></div>
</template>

<script>
import { Terminal } from 'xterm'
import * as attach from 'xterm/lib/addons/attach/attach'
import * as fit from 'xterm/lib/addons/fit/fit'

export default {
    data(){
        return {
            terminal: null,
            shellprompt: '$ '
        }
    },
    mounted(){
        Terminal.applyAddon(attach)
        Terminal.applyAddon(fit)

        this.terminal = new Terminal()
        this.terminal.open(this.$refs.terminal)

        //Connect socket
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        const port = location.port ? `:${location.port}` : '';
        const socketUrl = `${protocol}${location.hostname}${port}/shell`;
        const socket = new WebSocket(socketUrl);

        //Attach socket to terminal
        socket.onopen = (ev) => { this.terminal.attach(socket); };
    },
}
</script>

<style>
@import 'xterm/dist/xterm.css';
</style>