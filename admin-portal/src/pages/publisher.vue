<template>
  <div class="container my-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Quản lý nhà xuất bản</h2>
      <button class="btn btn-primary" @click="openAddModal">Thêm nhà xuất bản</button>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr>
            <th>Tên nhà xuất bản</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pub in publishers" :key="pub._id">
            <td>{{ pub.name }}</td>
            <td>{{ pub.address }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" title="Chỉnh sửa" @click="openUpdateModal(pub)">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn btn-sm btn-danger" title="Xóa" @click="deletePublisher(pub._id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <PublisherAddModal ref="addModal" @refresh-list="fetchPublishers" />
    <PublisherUpdateModal ref="updateModal" @refresh-list="fetchPublishers" />
  </div>
</template>

<script>
import { ref } from "vue";
import publisherService from "@/services/publisher.service";
import PublisherAddModal from "@/components/PublisherAddModal.vue";
import PublisherUpdateModal from "@/components/PublisherUpdateModal.vue";

export default {
  components: { PublisherAddModal, PublisherUpdateModal },

  data() {
    return {
      publishers: [], 
    };
  },

  setup() {
    const addModal = ref(null);
    const updateModal = ref(null);

    const openAddModal = () => {
      addModal.value?.open();
    };

    const openUpdateModal = (publisher) => {
      updateModal.value?.open(publisher);
    };

    return { addModal, updateModal, openAddModal, openUpdateModal };
  },

  methods: {
    async fetchPublishers() {
      try {
        const res = await publisherService.getAll();
        this.publishers = res.data.publishers;
      } catch (err) {
        console.error(err);
      }
    },

    async deletePublisher(id) {
      if (!confirm("Bạn có chắc muốn xóa nhà xuất bản này?")) return;
      try {
        await publisherService.delete(id);
        this.fetchPublishers();
      } catch (err) {
        console.error(err);
        alert("Xóa thất bại!");
      }
    },
  },

  async created() {
    this.fetchPublishers();
  },
};
</script>

<style scoped>
</style>