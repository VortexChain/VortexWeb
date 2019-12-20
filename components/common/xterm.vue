<template>
    <div ref="terminal"></div>
</template>

<script>
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'

export default {
    props: {
        sshUserId:{
            required: true,
            type: Number,
        },
    },
    data(){
        return {
            terminal: null,
            socket: null,
            shellprompt: '$ ',
            fitAddon: null
        }
    },
    methods:{
        connect(){
            this.terminal = new Terminal()
            this.fitAddon = new FitAddon()
            this.terminal.loadAddon(this.fitAddon)
            this.terminal.open(this.$refs.terminal)
            this.fitAddon.fit()

            this.terminal.setOption('theme', { background: '#1a202c' })

            //Connect socket
            const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://'
            const port = location.port ? `:${location.port}` : ''
            const socketUrl = `${protocol}${location.hostname}${port}/shell?sshUserId=${this.sshUserId}`
            this.socket = new WebSocket(socketUrl)

            //Attach socket to terminal
            this.socket.onopen = (ev) => {
                const attachAddon = new AttachAddon(this.socket)
                this.terminal.loadAddon(attachAddon)
            }
        },
        fit(){
            this.fitAddon.fit()
            this.socket.send(JSON.stringify({ command: 'resize', ptySafeCommand: true, data: {
                cols: this.terminal.cols,
                rows: this.terminal.rows
            }}))
        }
    },
    mounted(){
        if(this.sshUserId){
            this.connect()
        }

        if(process.browser){
            window.onresize = this.fit
        }
    },
    beforeDestroy(){
        if(process.browser){
            window.onresize = null
        }
    },
    watch:{
        sshUserId(){
            if(this.terminal){
                this.terminal.dispose()
                this.terminal = null
            }
            if(this.sshUserId){
                this.connect()
            }
        }
    }
}
</script>

<style>
@import 'xterm/css/xterm.css';
.terminal.xterm{
    padding: 10px;
}
</style>