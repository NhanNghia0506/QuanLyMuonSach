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
        <button class="btn btn-primary mt-3" @click="openModal">
          Đăng ký mượn sách
        </button>
      </div>

    </div>

    <div v-else class="text-center mt-5">
      <div class="spinner-border"></div>
      <p class="mt-3">Đang tải dữ liệu...</p>
    </div>

  </div>

  <!-- Modal Xác Nhận -->
  <div class="modal fade" id="confirmBorrowModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        
        <div class="modal-header">
          <h5 class="modal-title">Xác nhận đăng ký mượn</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          Bạn có chắc chắn muốn đăng ký mượn cuốn sách này không?
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-primary" @click="confirmBorrow">Đồng ý</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import bookService from "@/services/book.service";
import loan_transactionService from "@/services/loan_transaction.service";

export default {
  data() {
    return {
      book: null,
      modalInstance: null,
    };
  },

  async created() {
    const id = this.$route.params.id;

    try {
      const res = await bookService.getById(id);
      this.book = res.data.book;
    } catch (err) {
      console.error(err);
    }
  },

  mounted() {
    // Tạo instance modal bootstrap 5
    const modalEl = document.getElementById("confirmBorrowModal");
    this.modalInstance = new Modal(modalEl);
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN") + "đ";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },

    // Mở modal
    openModal() {
      this.modalInstance.show();
    },

    // Gọi API khi đồng ý
    async confirmBorrow() {
      try {
        const res = await loan_transactionService.loanReservation(this.book._id);
        this.modalInstance.hide();
        this.$router.push({ name: 'borrowlist' })
      } catch (err) {
        console.error(err.message);
      }
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
