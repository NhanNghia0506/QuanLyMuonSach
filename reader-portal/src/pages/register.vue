<template>
  <div class="container-fluid">
    <div class="row h-100">

      <!-- LEFT PANEL -->
      <div class="col-md-4 p-5 d-flex flex-column justify-content-center text-white left-panel">
        <div class="mb-4">
          <h4 class="fw-bold">Đăng ký tài khoản nhanh chóng</h4>
          <p>Nhập thông tin để bắt đầu sử dụng hệ thống mượn – trả sách trực tuyến.</p>
        </div>

        <div class="mb-4">
          <h4 class="fw-bold">Kho sách phong phú</h4>
          <p>Tra cứu hàng nghìn đầu sách thuộc nhiều lĩnh vực khác nhau.</p>
        </div>

        <div>
          <h4 class="fw-bold">Mượn sách dễ dàng</h4>
          <p>Đặt mượn trước, theo dõi lịch sử và quản lý sách đã mượn mọi lúc, mọi nơi.</p>
        </div>
  </div>


      <!-- RIGHT PANEL -->
      <div class="col-md-8 d-flex justify-content-center align-items-center bg-light h-100">
        <div class="form-box">

          <h2 class="mb-4 fw-bold text-center">ĐĂNG KÍ</h2>

          <Form @submit="submitForm" :validation-schema="schema">

            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <Field name="name" class="form-control" placeholder="Họ và tên" />
              <ErrorMessage name="name" class="text-danger small" />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <Field name="email" type="email" class="form-control" placeholder="email@gmail.com" />
              <ErrorMessage name="email" class="text-danger small" />
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" />
                <ErrorMessage name="password" class="text-danger small" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Số điện thoại</label>
                <Field name="phoneNumber" class="form-control" placeholder="0982..." />
                <ErrorMessage name="phoneNumber" class="text-danger small" />
              </div>
            </div>

            <!-- GENDER + DATE -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Giới tính</label>
                <div class="d-flex gap-4">
                  <label>
                    <Field type="radio" name="gender" value="Nam" /> Nam
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="Nữ" /> Nữ
                  </label>
                </div>
                <ErrorMessage name="gender" class="text-danger small" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Ngày sinh</label>
                <Field name="dateOfBirth" type="date" class="form-control" />
                <ErrorMessage name="dateOfBirth" class="text-danger small" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <Field name="address" class="form-control" placeholder="TPHCM..." />
              <ErrorMessage name="address" class="text-danger small" />
            </div>

            <button class="btn btn-primary w-100 py-2 mt-2">Create Account</button>
          </Form>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import readerServices from "@/services/reader.services";

export default {
  components: { Form, Field, ErrorMessage },

  data() {
    return {
      schema: Yup.object({
        name: Yup.string().required("Vui lòng nhập họ tên"),
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: Yup.string()
          .min(6, "Mật khẩu tối thiểu 6 ký tự")
          .required("Vui lòng nhập mật khẩu"),
        phoneNumber: Yup.string()
          .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
          .required("Vui lòng nhập số điện thoại"),
        gender: Yup.string().required("Chọn giới tính"),
        dateOfBirth: Yup.date().required("Chọn ngày sinh"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
      }),
    };
  },

  methods: {
    async submitForm(values) {
      try {
        const res = await readerServices.register(values);
         this.$router.push({ name: "login" })
      } catch (err) {
        console.error("Error:", err.response?.data);
      }
    },
  },
};
</script>

<style scoped>
.left-panel {
  background: linear-gradient(to bottom right, #a067ff, #684bff);
}

.form-box {
  width: 100%;
  max-width: 420px;
}
</style>
