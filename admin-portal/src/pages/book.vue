<template>
  <div class="container my-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Quản lý sách</h2>
      <button class="btn btn-primary" @click="openModal">
        Thêm sách
      </button>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tên sách</th>
            <th>Nhà xuất bản</th>
            <th>Ngày xuất bản</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>
              <img :src="`http://localhost:3000/uploads/${book.imageUrl}`" alt="Book Image" class="img-thumbnail" style="max-width: 80px;">
            </td>
            <td>{{ book.name }}</td>
            <td>{{ book.publisherId?.name ?? 'Không rõ' }}</td>
            <td>{{ formatDate(book.publishAt) }}</td>
            <td>{{ formatPrice(book.price) }}</td>
            <td>{{ book.quantity }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" title="Chỉnh sửa">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn btn-sm btn-danger" title="Xóa">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <BookAddModal ref="addModal" />
</template>

<script>
import bookService from "@/services/book.service";
import BookAddModal from "@/components/BookAddModal.vue";
import { ref } from "vue";

export default {
  components: {
    BookAddModal
  },

  data() {
    return {
      books: []
    }
  },

  setup() {
    const addModal = ref(null);

    function openModal() {
      addModal.value?.open();
    }

    return {
      addModal,
      openModal,
    };
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString('vi-VN') + 'đ'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN')
    },
  },

  async created() {
    try {
      const res = await bookService.getAll();
      this.books = res.data.books;
    } catch (err) {
      console.error(err);
    }
  },
}

</script>

<style scoped>
.img-thumbnail {
  height: 60px;
  width: 60px;
  object-fit: cover;
}
</style>
