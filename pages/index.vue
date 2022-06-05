<template>
<div>Loading...</div>
</template>
<script>

export default {
  name: 'Index',
  layout: 'App',
  data() {
    return {
      items: [
        {
          src: '',
        }
      ]
    }
  },
  async created() {
    this.$router.push('/signin')
  },
}

</script>
<style lang="scss" scoped>
</style>
