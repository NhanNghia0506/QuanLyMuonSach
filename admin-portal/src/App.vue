<script>
import AdminSlide from "./components/AdminSlide.vue";

export default {
  components: {
    AdminSlide
  }
};
</script>

<template>
  <div id="app" class="d-flex">
    <AdminSlide />

    <main class="content-area flex-grow-1">
      <div class="container py-4">
        <router-view />
      </div>
    </main>
  </div>
</template>


<style>
.page {
  max-width: 400px;
  margin: auto;
}

/* width sidebar của bạn (nếu bạn dùng 250px thì để 250px) */
#app {
  min-height: 100vh;
}

.content-area {
  margin-left: 250px; /* đúng bằng width của sidebar */
}

</style>