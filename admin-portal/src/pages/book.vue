<template>
  <div class="container my-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Quản lý sách</h2>
      <button class="btn btn-primary" @click="openAddModal">
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
              <img :src="`http://localhost:3000/uploads/${book.imageUrl}`" alt="Book Image" class="img-thumbnail">
            </td>
            <td>{{ book.name }}</td>
            <td>{{ book.publisherId?.name ?? 'Không rõ' }}</td>
            <td>{{ formatDate(book.publishAt) }}</td>
            <td>{{ formatPrice(book.price) }}</td>
            <td>{{ book.quantity }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" title="Chỉnh sửa" @click="openUpdateModal(book)">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn btn-sm btn-danger" title="Xóa" @click="deleteBook(book._id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <BookAddModal ref="addModal" @refresh-list="fetchBooks" />
    <BookUpdateModal ref="updateModal" @refresh-list="fetchBooks" />
  </div>
</template>

<script>
import { ref } from "vue";
import bookService from "@/services/book.service";
import BookAddModal from "@/components/BookAddModal.vue";
import BookUpdateModal from "@/components/BookUpdateModal.vue";

export default {
  components: { BookAddModal, BookUpdateModal },

  data() {
    return {
      books: [],
    };
  },

  setup() {
    const addModal = ref(null);
    const updateModal = ref(null);

    // Mở modal thêm
    const openAddModal = () => {
      addModal.value?.open();
    };

    // Mở modal chỉnh sửa với book được chọn
    const openUpdateModal = (book) => {
      updateModal.value?.open(book);
    };

    return { addModal, updateModal, openAddModal, openUpdateModal };
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN") + "đ";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },
    async fetchBooks() {
      try {
        const res = await bookService.getAll();
        this.books = res.data.books;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteBook(id) {
      if (!confirm("Bạn có chắc muốn xóa sách này?")) return;
      try {
        await bookService.delete(id);
        this.fetchBooks();
      } catch (err) {
        console.error(err);
        alert("Xóa thất bại!");
      }
    },
  },

  async created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.img-thumbnail {
  height: 60px;
  width: 60px;
  object-fit: cover;
}
</style>
