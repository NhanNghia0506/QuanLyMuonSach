<template>
  <div>
    <div
      class="modal fade"
      id="employeeAddModal"
      tabindex="-1"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title">Thêm nhân viên</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <Form :validation-schema="schema" @submit="submitAddEmployee">
              <div class="row g-3">

                <!-- Họ tên -->
                <div class="col-12">
                  <label class="form-label">Họ tên</label>
                  <Field name="name" type="text" class="form-control" placeholder="Nhập họ tên" />
                  <ErrorMessage name="name" class="text-danger small" />
                </div>

                <!-- Email -->
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <Field name="email" type="email" class="form-control" placeholder="Nhập email" />
                  <ErrorMessage name="email" class="text-danger small" />
                </div>

                <!-- Mật khẩu -->
                <div class="col-12">
                  <label class="form-label">Mật khẩu</label>
                  <Field name="password" type="password" class="form-control" placeholder="Nhập mật khẩu" />
                  <ErrorMessage name="password" class="text-danger small" />
                </div>

                <!-- Số điện thoại -->
                <div class="col-12">
                  <label class="form-label">Số điện thoại</label>
                  <Field name="phoneNumber" type="text" class="form-control" placeholder="Nhập số điện thoại" />
                  <ErrorMessage name="phoneNumber" class="text-danger small" />
                </div>

                <!-- Địa chỉ -->
                <div class="col-12">
                  <label class="form-label">Địa chỉ</label>
                  <Field name="address" type="text" class="form-control" placeholder="Nhập địa chỉ" />
                  <ErrorMessage name="address" class="text-danger small" />
                </div>

                <!-- Vai trò -->
                <div class="col-12">
                  <label class="form-label">Vai trò</label>
                  <Field as="select" name="role" class="form-select">
                    <option disabled value="">Chọn vai trò</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Nhân viên</option>
                  </Field>
                  <ErrorMessage name="role" class="text-danger small" />
                </div>

              </div>

              <!-- Hidden submit -->
              <button type="submit" hidden></button>
            </Form>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="triggerSubmit">Thêm nhân viên</button>
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
import staff from "@/services/staff.service";

// Modal refs
const modalRef = ref(null);
const modalInstance = ref(null);

// Yup validation
const schema = Yup.object({
  name: Yup.string().required("Tên không được để trống"),
  email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu không được để trống"),
  phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),
  role: Yup.string().required("Vui lòng chọn vai trò"),
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

// Submit trigger
function triggerSubmit() {
  modalRef.value.querySelector("button[type=submit]").click();
}

// Submit Form
async function submitAddEmployee(values) {
  try {
    await staff.register(values);
    close();
    emit("refresh-list");
  } catch (error) {
    alert(error.response?.data?.message || "Đã có lỗi xảy ra");
  }
}

const emit = defineEmits(["refresh-list"]);
defineExpose({ open, close });
</script>

<style scoped></style>
