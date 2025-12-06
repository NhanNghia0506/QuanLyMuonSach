<template>
  <div class="container my-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Quản lý nhân viên</h2>
      <button class="btn btn-primary" @click="openAddModal">Thêm nhân viên</button>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp._id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ emp.phoneNumber }}</td>
            <td>{{ emp.address }}</td>
            <td>{{ emp.role === 'admin' ? 'Quản trị viên' : 'Nhân viên' }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteEmployee(emp._id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <StaffAddModal ref="addModal" @refresh-list="fetchEmployees" />
  </div>
</template>

<script>
import { ref } from "vue";
import staffService from "@/services/staff.service";
import StaffAddModal from "@/components/StaffAddModal.vue";

export default {
  components: { StaffAddModal },

  data() {
    return {
      employees: [],
    };
  },

  setup() {
    const addModal = ref(null);
    const updateModal = ref(null);

    const openAddModal = () => addModal.value?.open();

    return { addModal, updateModal, openAddModal };
  },

  methods: {
    async fetchEmployees() {
      try {
        const res = await staffService.allStaffs();
        this.employees = res.data.staffs;
      } catch (err) {
        console.error(err);
      }
    },

    async deleteEmployee(id) {
      if (!confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
      try {
        await staffService.delete(id);
        this.fetchEmployees();
      } catch (err) {
        console.error(err);
        alert("Xóa thất bại!");
      }
    },
  },

  async created() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
</style>
