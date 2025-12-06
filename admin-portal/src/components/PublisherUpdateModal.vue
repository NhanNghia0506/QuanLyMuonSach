<template>
  <div>
    <div
      class="modal fade"
      id="publisherEditModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title">Chỉnh sửa nhà xuất bản</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <Form :validation-schema="schema" @submit="submitEdit" v-if="publisher">
              <div class="row g-3">

                <!-- Name -->
                <div class="col-12">
                  <label class="form-label">Tên nhà xuất bản</label>
                  <Field
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="Nhập tên nhà xuất bản"
                    v-model="form.name"
                  />
                  <ErrorMessage name="name" class="text-danger small" />
                </div>

                <!-- Address -->
                <div class="col-12">
                  <label class="form-label">Địa chỉ</label>
                  <Field
                    name="address"
                    type="text"
                    class="form-control"
                    placeholder="Nhập địa chỉ"
                    v-model="form.address"
                  />
                  <ErrorMessage name="address" class="text-danger small" />
                </div>
              </div>

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
import publisherService from "@/services/publisher.service";

const modalRef = ref(null);
const modalInstance = ref(null);

const publisher = ref(null);

const form = ref({
  name: "",
  address: "",
});

// Yup validation
const schema = Yup.object({
  name: Yup.string().required("Tên nhà xuất bản không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),
});

const emit = defineEmits(["refresh-list"]);

// OPEN modal
function open(selected) {
  publisher.value = selected;

  form.value = {
    name: selected.name || "",
    address: selected.address || "",
  };

  if (!modalInstance.value) {
    modalInstance.value = new Modal(modalRef.value);
  }
  modalInstance.value.show();
}

// CLOSE modal
function close() {
  modalInstance.value?.hide();
}

// Trigger form submit
function triggerSubmit() {
  modalRef.value.querySelector("button[type=submit]").click();
}

// SUBMIT
async function submitEdit(values) {
  try {
    await publisherService.update(publisher.value._id, values);
    emit("refresh-list");
    close();
  } catch (err) {
    console.error(err);
    alert("Lỗi khi cập nhật nhà xuất bản!");
  }
}

defineExpose({ open, close });
</script>

<style scoped></style>
