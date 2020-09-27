<script>
export default {
  beforeRouteEnter(to, from, next) {
    next({ name: to.name.replace('cabinet', 'cabinet-profile') })
  },
}
</script>
