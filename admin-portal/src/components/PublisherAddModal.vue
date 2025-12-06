<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="publisherAddModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          
          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title">Thêm nhà xuất bản</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <Form :validation-schema="schema" @submit="submitAddPublisher">
              <div class="row g-3">

                <!-- Tên NXB -->
                <div class="col-12">
                  <label class="form-label">Tên nhà xuất bản</label>
                  <Field name="name" type="text" class="form-control" placeholder="Nhập tên" />
                  <ErrorMessage name="name" class="text-danger small" />
                </div>

                <!-- Địa chỉ -->
                <div class="col-12">
                  <label class="form-label">Địa chỉ</label>
                  <Field name="address" type="text" class="form-control" placeholder="Nhập địa chỉ" />
                  <ErrorMessage name="address" class="text-danger small" />
                </div>

              </div>

              <!-- Hidden submit -->
              <button type="submit" hidden></button>
            </Form>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="triggerSubmit">Thêm nhà xuất bản</button>
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
import publisherService from "@/services/publisher.service";

// Modal
const modalRef = ref(null);
const modalInstance = ref(null);

// Yup validation
const schema = Yup.object({
  name: Yup.string().required("Tên nhà xuất bản không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),
});

// Open modal
function open() {
  if (!modalInstance.value) {
    modalInstance.value = new Modal(modalRef.value);
  }
  modalInstance.value.show();
}

// Close modal
function close() {
  modalInstance.value?.hide();
}

// Trigger form submit
function triggerSubmit() {
  modalRef.value.querySelector("button[type=submit]").click();
}

// Submit handler
async function submitAddPublisher(values) {
  try {
    await publisherService.create(values);
    close();
    emit("refresh-list");
  } catch (err) {
    console.error(err);
    alert("Lỗi khi thêm nhà xuất bản!");
  }
}

// Event
const emit = defineEmits(["refresh-list"]);

defineExpose({ open, close });
</script>

<style scoped></style>
