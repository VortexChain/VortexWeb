<template>
    <sui-modal
        v-model="open"
        size="mini"
        :animationDuration="animationDuration"
        :closable="false"
    >
        <sui-modal-header>Add ssh user</sui-modal-header>
        <sui-modal-content>
            <sui-form>
                <sui-form-field>
                    <label>Select server</label>
                    <sui-dropdown
                        :options="
                            sshServers.map(sshServer => {
                                return {
                                    key: sshServer.id,
                                    value: sshServer.id,
                                    text:
                                        sshServer.name + ' ' + sshServer.system
                                }
                            })
                        "
                        placeholder="Server"
                        search
                        :loading="gettingServers"
                        selection
                        v-model="addUser.serverId"
                    />
                </sui-form-field>
                <sui-form-field>
                    <label>Enter username</label>
                    <sui-input
                        placeholder="Username"
                        :disabled="!addUser.serverId"
                        :loading="checkingUsername"
                        :icon="this.usernameAvaible ? 'check' : 'close icon'"
                        v-model="addUser.username"
                        @input="checkUsername"
                    />
                </sui-form-field>
                <sui-form-field v-if="addUserSteps">
                    <label>Processing</label>
                    <p v-for="(step, index) in addUserSteps" :key="index">
                        {{ index + ': ' + step }}
                    </p>
                </sui-form-field>
            </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button :disabled="addUserProcessing" @click="$emit('close')">
                Cancel
            </sui-button>
            <sui-button
                :disabled="
                    addUserProcessing || !usernameAvaible || checkingUsername
                "
                positive
                @click="addNewUser"
            >
                Add
            </sui-button>
        </sui-modal-actions>
    </sui-modal>
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true
        },
        animationDuration: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            sshServers: [],
            addUser: {},
            addUserSteps: null,
            addUserProcessing: false,
            gettingServers: false,

            checkingUsername: false,
            usernameAvaible: false,
            checkingTimer: null
        }
    },
    created() {
        this.gettingServers = true
        this.$axios.get('api/GetSshServers').then(servers => {
            this.sshServers = servers.data
            this.gettingServers = false
        })
    },
    methods: {
        addNewUser() {
            let newUser = this.addUser
            this.addUserProcessing = true

            //Setup eventstream
            var es = new EventSource(
                `/addUser?serverId=${this.addUser.serverId}&username=${this.addUser.username}`
            )

            es.onmessage = event => {
                let data = JSON.parse(event.data)
                if (data.completed === true) {
                    this.$emit('close')
                    this.addUser = {}
                    this.addUserSteps = null
                    this.addUserProcessing = false
                    es.close()
                    this.$emit('success')
                    return
                } else if (data.completed === false) {
                    this.addUserProcessing = false
                    es.close()
                    this.$emit('failed')
                    return
                }
                this.addUserSteps = data
            }
        },
        checkUsername() {
            let usernameRegex = /^[a-z][-a-z0-9_]*$/
            if (
                this.addUser.username.length < 3 ||
                !usernameRegex.test(this.addUser.username)
            ) {
                if (this.checkingTimer) {
                    clearTimeout(this.checkingTimer)
                }
                this.checkingUsername = false
                this.usernameAvaible = false
                return
            }
            this.checkingUsername = true
            if (this.checkingTimer) {
                clearTimeout(this.checkingTimer)
            }
            this.checkingTimer = setTimeout(() => {
                this.$axios
                    .get(
                        `api/UsernameAvaible?username=${this.addUser.username}&serverId=${this.addUser.serverId}`
                    )
                    .then(res => {
                        this.checkingUsername = false
                        this.usernameAvaible = res.data

                        if (
                            this.addUser.username.length < 3 ||
                            !usernameRegex.test(this.addUser.username)
                        ) {
                            if (this.checkingTimer) {
                                clearTimeout(this.checkingTimer)
                            }
                            this.checkingUsername = false
                            this.usernameAvaible = false
                            return
                        }
                    })
            }, 500)
        }
    }
}
</script>

<style></style>
