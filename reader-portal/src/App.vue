<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import BookCard from "@/components/BookCard.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    BookCard,
  }
};
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <!-- HEADER -->
    <AppHeader />

    <!-- MAIN CONTENT -->
    <main class="flex-grow-1">
      <div class="container py-4">
        <router-view />
      </div>
    </main>
    />

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
