<template>
  <div class="container my-4">

    <h3 class="mb-4 fw-bold">SÁCH</h3>

    <div class="book-grid">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
      />
    </div>

  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import bookService from "@/services/book.service";

export default {
  components: { BookCard },

  data() {
    return {
      books: [] // khởi tạo rỗng trước
    };
  },

  async mounted() {
    try {
      const res = await bookService.getAll();
      this.books = res.data.books;
      console.log("Books fetched:", this.books);
    } catch (err) {
      console.error("Error:", err.response?.data);
    }
  }
};
</script>

<style scoped>
.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-grid > * {
  width: calc(25% - 20px);
}

@media (max-width: 992px) {
  .book-grid > * {
    width: calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .book-grid > * {
    width: calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  .book-grid > * {
    width: 100%;
  }
}
</style>
