<template>
  <div class="app-footer secondary-container" :style="whichLayout">
    <div class="coffeerights">
      <p>© 2022 Airbxb, inc</p>
      •
      <p>Privacy</p>
      •
      <p>Terms</p>
      •
      <p>Sitemap</p>
    </div>
    <div class="social-media">
      <a href="">facebook</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    whichLayout() {
      const layout = this.$route.path.split("/")[1];
      return layout === "stay" || layout === 'dashboard' ? { "position": "static" } : { "position": "fixed" };
    },
  },
};
</script>
