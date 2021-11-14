<template>
  <div class="container">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="toHome">
          Back Home
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'Exception404',
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
