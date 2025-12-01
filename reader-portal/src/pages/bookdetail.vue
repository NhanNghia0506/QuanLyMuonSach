<template>
  <div class="container my-5">

    <div v-if="book" class="row">

      <!-- Ảnh sách -->
      <div class="col-md-4 text-center">
        <img 
          :src="`http://localhost:3000/uploads/${book.imageUrl}`"
          alt="Book Image"
          class="img-fluid rounded shadow-sm book-img"
        />
      </div>

      <!-- Thông tin sách -->
      <div class="col-md-8">
        <h2 class="fw-bold mb-3">{{ book.name }}</h2>

        <p><strong>Giá:</strong> {{ formatPrice(book.price) }}</p>

        <p><strong>Nhà xuất bản:</strong> 
          {{ book.publisherId?.name ?? 'Không rõ' }}
        </p>

        <p><strong>Ngày xuất bản:</strong> 
          {{ formatDate(book.publishAt) }}
        </p>

        <p><strong>Số lượng còn lại:</strong> {{ book.quantity }}</p>

        <!-- Nút đăng ký mượn -->
        <button class="btn btn-primary mt-3" @click="registerBorrow">
          Đăng kí mượn sách
        </button>
      </div>

    </div>

    <div v-else class="text-center mt-5">
      <div class="spinner-border"></div>
      <p class="mt-3">Đang tải dữ liệu...</p>
    </div>

  </div>
</template>

<script>
import bookService from "@/services/book.service";

export default {
  data() {
    return {
      book: null,
    };
  },

  async created() {
    const id = this.$route.params.id;

    try {
      const res = await bookService.getById(id);
      this.book = res.data.book;
      console.log("Book detail:", this.book);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN") + "đ";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },
    registerBorrow() {
      alert("Bạn đã chọn đăng kí mượn sách!");
      // TODO: chuyển sang trang đăng ký mượn hoặc mở modal
    }
  }
};
</script>

<style scoped>
.book-img {
  max-height: 350px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
