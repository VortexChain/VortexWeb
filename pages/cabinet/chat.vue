<template>
    <div class="h-full flex items-stretch">
        <div class="flex-1 h-full flex flex-col items-stretch pr-3">
            <div ref="messagesArea" class="flex-1 overflow-auto flex flex-col pr-2 mb-3">
                <div v-for="(message, index) in messages" :key="index" v-ripple :class="message.userId == currentUser.uid ? 'mine' : ''" 
                    class="flex message-item bg-gray-200">
                    <div v-if="message.userId != currentUser.uid" style="margin-right: 20px;">
                        <sui-image v-if="getMessageUser(message).photoUrl" :src="getMessageUser(message).photoUrl" shape="circular" size="mini" style="min-width: 35px;"/>
                        <sui-icon v-else name="user circle outline"  style="height: 35px; width: 35px; font-size: 35px; line-height: 35px;" />
                    </div>
                    <div>
                        <p class="font-bold">{{ getMessageUser(message).name ? getMessageUser(message).name.split(' ')[0] : getMessageUser(message).email }}</p>
                        <p style="white-space: pre-line; word-break: break-word;">{{ message.messageText }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-200 flex items-stretch" style="height: 100px;">
                <div class="flex-1 pl-3 pt-3 pb-3">
                    <textarea v-model="messageText" @keydown.ctrl.enter="sendMessage" class="w-full h-full p-2" style="resize: none; outline: none;"></textarea>
                </div>
                <div>
                    <button @click="sendMessage" v-ripple class="h-full" style="width: 70px; outline: none;">
                        <img class="m-auto" src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23828A99%22%20d%3D%22M4.7%2015.8c-.7%201.9-1.1%203.2-1.3%203.9-.6%202.4-1%202.9%201.1%201.8%202.1-1.1%2012-6.7%2014.3-7.9%202.9-1.6%202.9-1.5-.2-3.2-2.3-1.4-12.2-6.8-14-7.9s-1.7-.6-1.2%201.8c.2.8.6%202.1%201.3%203.9.5%201.3%201.6%202.3%203%202.5l5.8%201.1c.1%200%20.1.1.1.1s0%20.1-.1.1l-5.8%201.1c-1.3.4-2.5%201.3-3%202.7z%22%2F%3E%3C%2Fsvg%3E" alt="Send">
                        <!-- <sui-icon size="large" name="paper plane"/> -->
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-gray-300 p-3 chat-clients">
            <div v-for="(client, index) in clients" :key="'online'+index" v-ripple class="bg-gray-400 chat-user px-3">
                <sui-image v-if="client.photoUrl" :src="client.photoUrl" shape="circular" size="mini"/>
                <sui-icon v-else name="user circle outline"  style="height: 35px; width: 35px; font-size: 35px; line-height: 35px;" />
                <div class="ml-3">
                    <p class="font-bold">{{ client.name ? client.name : client.email }}</p>
                    <p class="font-medium text-sm">{{ '🍌 Я ем банан' }}</p>
                </div>
            </div>
            <div v-for="(client, index) in offlineUsers" :key="'offline'+index" v-ripple class="bg-gray-300 chat-user px-3">
                <sui-image v-if="client.photoUrl" :src="client.photoUrl" shape="circular" size="mini"/>
                <sui-icon v-else name="user circle outline"  style="height: 35px; width: 35px; font-size: 35px; line-height: 35px;" />
                <div class="ml-3">
                    <p class="font-bold">{{ client.name ? client.name : client.email }}</p>
                    <p class="font-medium text-sm">{{ 'Offline' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    middleware: 'auth',
    layout: 'cabinet',
    data(){
        return{
            connection: null,
            clients: [],
            users: [],
            messages: [],
            messageText: ''
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.user.currentUser,
        }),
        ...mapGetters({
            userToken: 'user/getToken'
        }),
        offlineUsers(){
            return this.users.filter(user => {
                if(this.clients.find(client => client.uid == user.uid)) return false
                return true
            })
        }
    },
    methods: {
        initChatConnection(){
            this.connection = new HubConnectionBuilder()
                .withUrl(`/chat`, { accessTokenFactory: () => this.userToken })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build()

            this.connection.on('ChatReady', (data) => {
                this.messages = data.messages.sort((a, b) => b.id.timestamp - a.id.timestamp)
                this.clients = data.clients,
                this.users = data.users
            })

            this.connection.on('UserJoin', (user) => {
                this.clients.push(user)
                if(!this.users.find(client => client.uid == user.uid)) this.users.push(user)
            })

            this.connection.on('UserLeave', (user) => {
                this.clients = this.clients.filter(client => client.uid != user.uid)
            })

            this.connection.on('ReceiveMessage', (message) => {
                this.messages.unshift(message)
            })

            this.connection.on('ReciveOldMessages', (messages) => {
                this.messages = messages.sort((a, b) => b.id.timestamp - a.id.timestamp)
            })

            this.connection.start()
        },
        sendMessage(){
            function isNullOrWhitespace(input) {
                if (typeof input === 'undefined' || input == null) return true
                return input.replace(/\s/g, '').length < 1
            }

            if(!isNullOrWhitespace(this.messageText)){
                this.connection.invoke('SendMessage', this.messageText).then(() => {
                    this.messageText = ''
                })
            }
        },
        getMessageUser(message){
            return this.users.find(user => user.uid == message.userId)
        }
    },
    created(){
        if(process.browser){
            this.initChatConnection()
        }
    },
    beforeDestroy(){
        this.connection.stop()
    }
}
</script>

<style lang="less" scoped>
.message-item{
    padding: 20px;
    margin-bottom: 20px;
    align-self: flex-start;
    &.mine{
        align-self: flex-end;
    }
}
.chat-clients{
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;


    .chat-user{
        width: 100%;
        height: 50px;
        user-select: none;
        display: flex;
        align-items: center;
        margin-top: 0.75rem;

        &:first-child{
            margin-top: 0;
        }
    }
}
</style>