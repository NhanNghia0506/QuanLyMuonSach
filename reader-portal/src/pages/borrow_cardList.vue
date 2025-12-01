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
        <tr v-for="borrow in borrows" :key="borrow._id">
          <td>{{ borrow.book?.name || "Không rõ" }}</td>
          <td>{{ formatDate(borrow.registerDate) }}</td>
          <td>
            <span
              :class="{
                'badge bg-warning': borrow.status === 'pending',
                'badge bg-success': borrow.status === 'approved',
                'badge bg-secondary': borrow.status === 'returned',
              }"
            >
              {{ statusText(borrow.status) }}
            </span>
          </td>
          <td>{{ borrow.staff?.name || "-" }}</td>
          <td>{{ borrow.approvedDate ? formatDate(borrow.approvedDate) : "-" }}</td>
          <td>{{ borrow.returnDate ? formatDate(borrow.returnDate) : "-" }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="borrows.length === 0" class="text-center mt-4">
      <p>Chưa có phiếu mượn nào.</p>
    </div>
  </div>
</template>

<script>
// import borrowService from "@/services/borrow.service";

export default {
  data() {
    return {
      borrows: [],
    };
  },

  async created() {
    try {
      const res = await borrowService.getAll();
      this.borrows = res.data.borrows;
      console.log("Borrow list:", this.borrows);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString("vi-VN") : "-";
    },
    statusText(status) {
      switch (status) {
        case "pending":
          return "Chờ duyệt";
        case "approved":
          return "Đã duyệt";
        case "returned":
          return "Đã trả";
        default:
          return status;
      }
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
}
</style>
