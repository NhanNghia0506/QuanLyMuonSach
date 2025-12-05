<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="bookEditModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title">Chỉnh sửa sách</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <Form :validation-schema="schema" @submit="submitEditBook" v-if="book">
              <div class="row g-3">

                <!-- Tên sách -->
                <div class="col-12">
                  <label class="form-label">Tên sách</label>
                  <Field
                    name="name"
                    type="text"
                    class="form-control"
                    v-model="bookForm.name"
                    placeholder="Nhập tên sách"
                  />
                  <ErrorMessage name="name" class="text-danger small" />
                </div>

                <!-- Nhà xuất bản -->
                <div class="col-md-6">
                    <label class="form-label">Nhà xuất bản</label>
                    <Field
                      as="select"
                      name="publisherId"
                      class="form-select"
                      v-model="bookForm.publisherId"
                    >
                      <option disabled value="">Chọn nhà xuất bản</option>

                      <option
                        v-for="p in publishers"
                        :key="p._id"
                        :value="p._id"
                      >
                        {{ p.name }}
                      </option>
                    </Field>

                    <ErrorMessage name="publisherId" class="text-danger small" />
                </div>

                <!-- Ngày xuất bản -->
                <div class="col-md-6">
                  <label class="form-label">Ngày xuất bản</label>
                  <Field
                    name="publishAt"
                    type="date"
                    class="form-control"
                    v-model="bookForm.publishAt"
                  />
                  <ErrorMessage name="publishAt" class="text-danger small" />
                </div>

                <!-- Giá -->
                <div class="col-md-6">
                  <label class="form-label">Giá (VND)</label>
                  <Field
                    name="price"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá"
                    v-model="bookForm.price"
                  />
                  <ErrorMessage name="price" class="text-danger small" />
                </div>

                <!-- Số lượng -->
                <div class="col-md-6">
                  <label class="form-label">Số lượng</label>
                  <Field
                    name="quantity"
                    type="number"
                    class="form-control"
                    placeholder="Nhập số lượng"
                    v-model="bookForm.quantity"
                  />
                  <ErrorMessage name="quantity" class="text-danger small" />
                </div>

                <!-- Ảnh -->
                <div class="col-12">
                  <label class="form-label">Ảnh sách</label>
                  <input type="file" class="form-control" @change="onFileChange"/>
                  <div v-if="fileError" class="text-danger small mt-1">
                    {{ fileError }}
                  </div>
                  <img v-if="previewImage" :src="previewImage" alt="Ảnh mới" class="img-thumbnail" style="height: 150px;" />
                  <div v-else-if="book.imageUrl" class="mt-2">
                    <img :src="`http://localhost:3000/uploads/${book.imageUrl}`" alt="Ảnh sách" class="img-thumbnail" style="height: 150px;" />
                  </div>
                </div>

              </div>

              <!-- Hidden submit -->
              <button type="submit" hidden></button>
            </Form>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="triggerSubmit">Lưu thay đổi</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Modal } from "bootstrap";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";

// Modal refs
const modalInstance = ref(null);
const modalRef = ref(null);
const previewImage = ref(null);

// Data
const publishers = ref([]);
const imageFile = ref(null);
const fileError = ref("");
const book = ref(null); // sách được truyền từ trang trước

// Form model
const bookForm = ref({
  name: "",
  publisherId: "",
  publishAt: "",
  price: "",
  quantity: "",
});

// Yup validation
const schema = Yup.object({
  name: Yup.string().required("Tên sách không được để trống"),
  publisherId: Yup.string().required("Vui lòng chọn nhà xuất bản"),
  publishAt: Yup.string().required("Ngày xuất bản không được để trống"),
  price: Yup.number().required("Giá không được để trống").min(1, "Giá phải > 0"),
  quantity: Yup.number().required("Số lượng không được để trống").min(1, "Số lượng phải > 0"),
});

// Fetch publishers
async function fetchPublishers() {
  const res = await publisherService.getAll();
  publishers.value = res.data.publishers;
}

// Open modal với book được truyền
function open(selectedBook) {
  book.value = selectedBook;

  // Gán giá trị cho form
  bookForm.value = {
    name: selectedBook.name || "",
    publisherId: selectedBook.publisherId || "",
    publishAt: selectedBook.publishAt ? selectedBook.publishAt.slice(0, 10) : "", // yyyy-mm-dd
    price: selectedBook.price || 0,
    quantity: selectedBook.quantity || 0,
  };

  if (!modalInstance.value) {
    modalInstance.value = new Modal(modalRef.value);
  }
  modalInstance.value.show();
  fetchPublishers();
}

// Close modal
function close() {
  if (modalInstance.value) {
    modalInstance.value.hide();
  }
}

// Submit click trigger
function triggerSubmit() {
  modalRef.value.querySelector("button[type=submit]").click();
}

// File upload
function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  imageFile.value = file;
  fileError.value = "";
  book.value.imageUrl = null; 

  // preview file mới
  previewImage.value = URL.createObjectURL(file);
}

// Submit form
async function submitEditBook(values) {
  const fd = new FormData();
  Object.keys(values).forEach((key) => fd.append(key, values[key]));
  if (imageFile.value) fd.append("image", imageFile.value);


  try {
    await bookService.update(book.value._id, fd);
    close();
    emit("refresh-list");
  } catch (err) {
    console.error(err);
    alert("Lỗi khi chỉnh sửa sách!");
  }
}

const emit = defineEmits(["refresh-list"]);

defineExpose({ open, close });
</script>

<style scoped></style>
