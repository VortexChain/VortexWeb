<template>
  <div class="terminal-layout">
    <div class="select-connection mb-5">
      <div
        v-for="(connection, index) in sshConnections"
        :key="index"
        @click="selectedConnection = connection"
        class="ssh-connection bg-gray-900 hover:bg-gray-800 cursor-pointer"
        >
        <div>Username: {{ connection.username }}</div>
        <div>Server: {{ connection.server.name }}</div>
        <div>Host: {{ connection.server.host }}:{{ connection.server.port }}</div>
        <div>Subscribtion: Pro</div>
      </div>
    </div>
    <div ref="consoleContainer" v-if="selectedConnection" class="bg-gray-900 p-3 console-container">
      <vue-xterm ref="terminal" :ssh-user-id="selectedConnection.id" style="height: calc( 100% - 20px );"/>
      <div class="console-control">
        <div class="fullscreen-button" @click="maximizeConsole"> На все ебало </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
    layout: 'cabinet',
    async asyncData({ $axios }) {
      try{
        let sshConnections = await $axios.$get('api/GetSshConnections')
        return { sshConnections }
      } catch(err) {
        console.error(err)
      }
    },
    data(){
      return{
        selectedConnection: null
      }
    },
    methods: {
      maximizeConsole(){
        if (!document.fullscreenElement){
          this.$refs.consoleContainer.addEventListener("fullscreenchange", () => { this.$refs.terminal.fit() })
          this.$refs.consoleContainer.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
    }
}
</script>

<style lang="less" scoped>

.terminal-layout{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.select-connection{
  width: 100%;
  display: flex;
  align-items: stretch;

  .ssh-connection{
    width: 300px;
    color: white;
    padding: 15px;
    margin-right: 10px;
  }
}

.console-container{
  position: relative;
  height: 449px;

  .console-control{
    width: 100%;
    height: 20px;
    display: flex;

    .fullscreen-button{
      cursor: pointer;
      margin-left: auto;
      height: 20px;
      color: white;
      padding: 0 5px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
}

</style>