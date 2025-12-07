<template>
  <div class="container my-4">
    <h3 class="mb-4 fw-bold">Danh sách phiếu mượn</h3>
    <!-- Bộ lọc -->
    <div class="card p-3 mb-3">
        <div class="row g-2">

          <!-- Tên người mượn -->
          <div class="col-md-3">
            <input
              v-model="filters.reader"
              type="text"
              class="form-control"
              placeholder="Tên độc giả"
            />
          </div>

          <!-- Chọn sách -->
          <div class="col-md-3">
            <select
              v-model="filters.book"
              class="form-select"
            >
              <option value="">-- Tất cả sách --</option>
              <option
                v-for="b in books"
                :key="b._id"
                :value="b.name"
              >
                {{ b.name }}
              </option>
            </select>
          </div>

          <!-- Trạng thái -->
          <div class="col-md-2">
            <select v-model="filters.status" class="form-select">
              <option value="">-- Tất cả trạng thái --</option>
              <option value="Chờ được duyệt">Chờ được duyệt</option>
              <option value="Được duyệt">Được duyệt</option>
              <option value="Đang mượn">Đang mượn</option>
              <option value="Đã trả">Đã trả</option>
            </select>
          </div>

          <!-- Từ ngày -->
          <div class="col-md-2">
            <input
              v-model="filters.from"
              type="date"
              class="form-control"
              placeholder="Từ ngày"
            />
          </div>

          <!-- Đến ngày -->
          <div class="col-md-2">
            <input
              v-model="filters.to"
              type="date"
              class="form-control"
              placeholder="Đến ngày"
            />
          </div>

          <div class="col-md-12 text-end mt-2">
            <button @click="applyFilter" class="btn btn-primary">
              Lọc
            </button>
            <button @click="resetFilter" class="btn btn-secondary ms-2">
              Xóa lọc
            </button>
          </div>

        </div>
    </div>



    <table class="table table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">Tên sách</th>
          <th scope="col">Đọc giả</th>
          <th scope="col">Ngày đăng kí</th>
          <th scope="col">Nhân viên duyệt</th>
          <th scope="col">Ngày duyệt</th>
          <th scope="col">Ngày trả</th>
          <th scope="col">Trạng thái</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="loan in loans" :key="loan._id">
          <td>{{ loan.bookId?.name || "Không rõ" }}</td>
          <td>{{ loan.readerId?.name }}</td>
          <td>{{ formatDate(loan.createdAt) }}</td>
          <td>{{ loan.staffId?.name || "-" }}</td>
          <td>{{ loan.approvedAt ? formatDate(loan.approvedAt) : "-" }}</td>
          <td>{{ loan.returnedAt ? formatDate(loan.returnedAt) : "-" }}</td>

          <td>
            <button
              v-if="loan.status === 'Chờ được duyệt'"
              class="btn btn-sm btn-primary"
              @click="openModal('approve', loan)"
            >
              Duyệt
            </button>

            <button
              v-else-if="loan.status === 'Được duyệt'"
              class="btn btn-sm btn-success"
              @click="openModal('confirmBorrow', loan)"
            >
              Xác nhận đã mượn
            </button>

            <button
              v-else-if="loan.status === 'Đang mượn'"
              class="btn btn-sm btn-info"
              @click="openModal('confirmReturned', loan)"
            >
              Xác nhận đã trả
            </button>

            <strong v-else>
              {{ loan.status }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loans.length === 0" class="text-center mt-4">
      <p>Chưa có phiếu mượn nào.</p>
    </div>

    <!-- Modal dùng chung -->
    <div
      class="modal fade show"
      tabindex="-1"
      v-if="showModal"
      style="display: block; background: rgba(0,0,0,0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body">
            <p>{{ modalMessage }}</p>

            <p class="fw-bold text-primary">
              Sách: {{ selectedLoan?.bookId?.name }}
            </p>
            <p class="fw-bold text-primary">
              Độc giả: {{ selectedLoan?.readerId?.name }}
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Hủy</button>
            <button class="btn btn-success" @click="handleAction">
              {{ modalConfirmText }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bookService from "@/services/book.service";
import loanTransactionService from "@/services/loan_transaction.service";

export default {
  data() {
    return {
      loans: [],
      books: [],
      filters: {
        reader: "",
        book: "",
        status: "",
        from: "",
        to: ""
      },
      showModal: false,
      selectedLoan: null,

      modalType: null,       // "approve" | "confirmBorrow" | "confirmReturned"
      modalTitle: "",
      modalMessage: "",
      modalConfirmText: "",
    };
  },

  async created() {
    try {
      const res = await loanTransactionService.allTransactions();
      this.loans = res.data.loanTrans;

       // Load danh sách sách cho bộ lọc
      const booksRes = await bookService.getAll();
      this.books = booksRes.data.books;
    } catch (err) {
      console.error(err);
    }
  },

  methods: {

      async applyFilter() {
        const params = {};

        if (this.filters.reader) params.reader = this.filters.reader;
        if (this.filters.book) params.book = this.filters.book;
        if (this.filters.status) params.status = this.filters.status;
        if (this.filters.from) params.from = this.filters.from;
        if (this.filters.to) params.to = this.filters.to;

        console.log("Filter params:", params);

        try {
          const res = await loanTransactionService.filterTransactions(params);
          console.log("Filtered loans:", res.data.loanTrans);
          this.loans = res.data.loanTrans;
        } catch (error) {
          alert(error.response?.data?.message || "Lỗi khi duyệt");
        }
    },

    resetFilter() {
      this.filters = {
        reader: "",
        book: "",
        status: "",
        from: "",
        to: ""
      };
      this.applyFilter();
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString("vi-VN") : "-";
    },

    // ⬅️ Mở modal với loại chức năng
    openModal(type, loan) {
      this.selectedLoan = loan;
      this.modalType = type;

      if (type === "approve") {
        this.modalTitle = "Xác nhận duyệt";
        this.modalMessage = "Bạn có chắc muốn duyệt yêu cầu mượn này không?";
        this.modalConfirmText = "Xác nhận duyệt";
      }

      if (type === "confirmBorrow") {
        this.modalTitle = "Xác nhận đã mượn";
        this.modalMessage = "Xác nhận rằng độc giả đã nhận sách?";
        this.modalConfirmText = "Xác nhận";
      }

      if (type === "confirmReturned") {
        this.modalTitle = "Xác nhận đã trả";
        this.modalMessage = "Xác nhận rằng độc giả đã trả sách?";
        this.modalConfirmText = "Xác nhận";
      }

      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedLoan = null;
      this.modalType = null;
    },

    // ⬅️ Nút xác nhận trong modal
    async handleAction() {
      if (this.modalType === "approve") {
        await this.approveLoan();
      }

      if (this.modalType === "confirmBorrow") {
        await this.confirmBorrow();
      }

      if(this.modalType === "confirmReturned") {
        await this.confirmReturned();
      }
    },

    async loadLoans() {
      const res = await loanTransactionService.allTransactions();
      this.loans = res.data.loanTrans;
    },

    // Xử lý duyệt mượn
    async approveLoan() {
      try {
        await loanTransactionService.approve(this.selectedLoan._id);
        await this.loadLoans();
        this.closeModal();
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi khi duyệt");
      }
    },

    // Xử lý xác nhận đã mượn
    async confirmBorrow() {
      try {
        await loanTransactionService.confirmBorrow(this.selectedLoan._id);
        await this.loadLoans();
        this.closeModal();
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi xác nhận mượn");
      }
    },

    // Xử lý xác nhận đã trả
    async confirmReturned() {
      try {
        const res = await loanTransactionService.confirmReturned(this.selectedLoan._id);
        console.log("Confirm returned response:", res.data.newLoan);
        if(res.data.newLoan.fine) {
          alert(`Độc giả có khoản phạt: ${res.data.newLoan.fine} VND`);
        }
        await this.loadLoans();
        this.closeModal();
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi xác nhận mượn");
      }
    }
  },
};
</script>



<style scoped>
.badge {
  font-size: 0.9rem;
}
</style>
