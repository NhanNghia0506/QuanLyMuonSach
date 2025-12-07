<template>
  <div class="card shadow-sm book-card">
    <img
      :src="`http://localhost:3000/uploads/${book.imageUrl}`"
      class="card-img-top book-img"
      alt="Book Image"
    />

    <div class="card-body">
      <h5 class="card-title">{{ book.name }}</h5>
      <p class="card-text mb-1 text-muted">
        Tác giả: <strong>{{ book.author }}</strong>
      </p>
      <p class="card-text mb-1">
        Giá: <span class="text-danger fw-bold">{{ formatPrice(book.price) }}</span>
      </p>
      <!-- <p class="card-text">
        Số lượng: <span class="fw-bold">{{ book.quantity }}</span>
      </p> -->

      <!-- Nút chuyển trang -->
      <router-link 
        :to="{ name: 'bookdetail', params: { id: book._id } }"
        class="btn btn-primary w-100"
      >
        Xem chi tiết
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookCard",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN") + " đ";
    },
  },
};
</script>

<style scoped>
.book-img {
  height: 200px;
  object-fit: cover;
}
.book-card {
  width: 100%;
  border-radius: 12px;
}
</style>
