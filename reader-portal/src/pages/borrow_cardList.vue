<template>
  <div class="container my-4">
    <h3 class="mb-4 fw-bold">Danh sách phiếu mượn</h3>

    <table class="table table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">Tên sách</th>
          <th scope="col">Ngày đăng kí</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Ngày duyệt</th>
          <th scope="col">Ngày trả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan._id">
          <td>{{ loan.bookId?.name || "Không rõ" }}</td>
          <td>{{ formatDate(loan.createdAt) }}</td>
          <td>
            <span>
              {{ loan.status }}
            </span>
          </td>
          <td>{{ loan.staffId?.name || "-" }}</td>
          <td>{{ loan.approvedAt ? formatDate(loan.approvedAt) : "-" }}</td>
          <td>{{ loan.returnedAt ? formatDate(loan.returnedAt) : "-" }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="loans.length === 0" class="text-center mt-4">
      <p>Chưa có phiếu mượn nào.</p>
    </div>
  </div>
</template>

<script>
import loanTransactionService from "@/services/loan_transaction.service";

export default {
  data() {
    return {
      loans: [],
    };
  },

  async created() {
    try {
      const res = await loanTransactionService.myLoanTransactions();
      this.loans = res.data.loanTrans;
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString("vi-VN") : "-";
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
}
</style>
