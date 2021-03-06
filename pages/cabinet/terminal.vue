<template>
  <div class="terminal-layout">
    <div class="select-connection mb-5">
      <div
        v-for="(connection, index) in sshConnections"
        :key="index"
        class="ssh-connection bg-gray-900 hover:bg-gray-800 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        :class="selectedConnection == connection ? 'border-green-600' : ''"
        @click="openConnection(connection)"
      >
        <div>Username: {{ connection.username }}</div>
        <div>Server: {{ connection.server.name }}</div>
        <div>
          Host: {{ connection.server.host }}:{{ connection.server.port }}
        </div>
        <div>Subscribtion: Pro</div>
      </div>
      <div
        class="ssh-connection new bg-gray-900 hover:bg-gray-800 cursor-pointer"
        @click="addUserModal = true"
      >
        <sui-icon name="plus" size="big" />
      </div>
      <add-user-modal
        :open.sync="addUserModal"
        @close="addUserModal = false"
        @success="updateConnections"
      />
    </div>
    <div
      v-if="activeConnections.length > 0"
      ref="consoleContainer"
      class="bg-gray-900 console-container"
    >
      <div class="tabs">
        <div
          v-for="(connection, index) in activeConnections"
          :key="'oc' + index"
          class="tab-item"
        >
          {{ connection.username }}-{{ connection.index }}
          <sui-icon
            class="m-0 ml-1"
            name="close icon"
            size="small"
            @click="closeConnection(connection)"
          />
        </div>
      </div>
      <vue-xterm
        ref="terminal"
        class="console"
        :ssh-user-id="selectedConnection.id"
      />
      <div class="console-control">
        <div class="button" @click="refreshConsole">
          <sui-icon class="m-0 mr-1" name="sync alternate" /> Refresh
        </div>
        <div class="button ml-auto" @click="maximizeConsole">
          <sui-icon class="m-0" name="expand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddUserModal from '@/components/terminal/add-user-modal.vue'

export default {
  middleware: 'auth',
  layout: 'cabinet',
  components: {
    AddUserModal,
  },
  async asyncData({ $axios }) {
    const sshConnectionsPromise = $axios.$get('api/GetSshConnections')
    const sshServersPromise = $axios.$get('api/GetSshServers')
    const [sshConnections, sshServers] = await Promise.all([
      sshConnectionsPromise,
      sshServersPromise,
    ])
    return {
      sshConnections,
      sshServers,
    }
  },
  data() {
    return {
      addUserModal: false,
      openConnections: {},
      selectedConnection: null,
    }
  },
  computed: {
    activeConnections() {
      return Object.values(this.openConnections).flat()
    },
  },
  methods: {
    openConnection(connection) {
      if (!this.openConnections[connection.username]) {
        this.openConnections[connection.username] = []
      }

      const modified = { ...connection }
      if (this.openConnections[connection.username].length > 0) {
        const lastIndex =
          this.openConnections[connection.username][
            this.openConnections[connection.username].length - 1
          ].index || 0
        modified.index = lastIndex + 1
      }

      this.openConnections[connection.username].push(modified)

      this.openConnections = { ...this.openConnections }

      this.selectedConnection = modified
    },
    closeConnection(connection) {
      this.openConnections[connection.username] = this.openConnections[
        connection.username
      ].filter((c) => c.index !== connection.index)
      this.openConnections = { ...this.openConnections }
    },
    maximizeConsole() {
      if (!document.fullscreenElement) {
        this.$refs.consoleContainer.addEventListener('fullscreenchange', () => {
          this.$refs.terminal.fit()
        })
        this.$refs.consoleContainer.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    refreshConsole() {
      this.$refs.terminal.reconnect()
    },
    async updateConnections() {
      this.sshConnections = await this.$axios.$get('api/GetSshConnections')
    },
  },
}
</script>

<style lang="less" scoped>
.terminal-layout {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.select-connection {
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;

  .ssh-connection {
    color: white;
    padding: 10px 15px;
    border: solid white 5px;
    height: 106px;

    &.new {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 106px;
    }
  }
}

.console-container {
  position: relative;
  height: 449px;

  .tabs {
    width: 100%;
    display: flex;
    background: #12171f;
    flex-wrap: wrap;

    .tab-item {
      height: 35px;
      background: rgb(37, 45, 59);
      padding: 0 10px;
      display: flex;
      align-items: center;
      color: white;
      cursor: pointer;
      user-select: none;
    }
  }

  .console {
    height: calc(100% - 20px - 35px);
  }

  .console-control {
    width: 100%;
    height: 20px;
    display: flex;
    background: #12171f;

    .button {
      cursor: pointer;
      height: 20px;
      color: white;
      padding: 0 5px;
      font-size: 11px;
      line-height: 11px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
