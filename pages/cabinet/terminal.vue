<template>
  <div class="terminal-layout">
    <div class="select-connection mb-5">
      <div
        v-for="(connection, index) in sshConnections"
        :key="index"
        @click="selectedConnection = connection"
        class="ssh-connection bg-gray-900 hover:bg-gray-800 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        :class="selectedConnection == connection ? 'border-green-600' : ''"
        >
        <div>Username: {{ connection.username }}</div>
        <div>Server: {{ connection.server.name }}</div>
        <div>Host: {{ connection.server.host }}:{{ connection.server.port }}</div>
        <div>Subscribtion: Pro</div>
      </div>
      <div class="ssh-connection new bg-gray-900 hover:bg-gray-800 cursor-pointer" @click="addUserModal = true">
        <sui-icon name="plus" size="big"/>
      </div>
      <add-user-modal :open.sync="addUserModal" @close="addUserModal = false" @success="updateConnections"/>
    </div>
    <div ref="consoleContainer" v-if="selectedConnection" class="bg-gray-900 p-3 console-container">
      <vue-xterm ref="terminal" :ssh-user-id="selectedConnection.id" style="height: calc( 100% - 20px );"/>
      <div class="console-control">
        <div class="fullscreen-button" @click="maximizeConsole"> <sui-icon class="m-0" name="expand"/> </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearTimeout } from 'timers'
import AddUserModal from '@/components/terminal/add-user-modal.vue';

export default {
    middleware: 'auth',
    layout: 'cabinet',
    components: {
      AddUserModal
    },
    async asyncData({ $axios }) {
      let sshConnections = await $axios.$get('api/GetSshConnections')
      let sshServers = await $axios.$get('api/GetSshServers')
      return {
        sshConnections,
        sshServers
      }
    },
    data(){
      return {
        addUserModal: false,
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
      },
      async updateConnections(){
        this.sshConnections = await this.$axios.$get('api/GetSshConnections')
      }
    },
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
  flex-wrap: wrap;

  .ssh-connection{
    color: white;
    padding: 10px 15px;
    border: solid white 5px;
    height: 106px;

    &.new{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 106px;
    }
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