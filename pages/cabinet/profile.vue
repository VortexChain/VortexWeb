<template>
  <div>
    <sui-form>
      <sui-form-field>
        <label>Name</label>
        <input v-model="name" placeholder="Name" />
      </sui-form-field>
      <sui-form-field>
        <label>Role</label>
        <input v-model="role" placeholder="Auth role" />
      </sui-form-field>
      <sui-button type="submit" @click.prevent="updateProfile()"
        >Submit</sui-button
      >
      <sui-button type="submit" @click.prevent="openModal"
        >OpenModal</sui-button
      >
    </sui-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import Check2fa from '@/components/common/check-2fa.js'

export default {
  middleware: 'auth',
  layout: 'cabinet',
  data() {
    return {
      name: null,
      role: 'Creater',
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
    }),
    openModal() {
      // Check2fa.open(this.$store, { animationDuration: 300 })
      //   .then(() => {
      //     console.log('YAY')
      //   })
      //   .catch(() => {
      //     console.log('Ohh')
      //   })
    },
    updateProfile() {
      // this.$axios.get('SetRole?role=Creater')
      this.updateUser({ name: this.name, role: this.role })
    },
  },
}
</script>

<style></style>
