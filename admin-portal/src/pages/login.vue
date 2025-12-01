<template>
  <div class="container-fluid">
    <div class="row h-100">
      <!-- RIGHT PANEL -->
      <div class="col-md-8 d-flex justify-content-center align-items-center bg-light h-100">
        <div class="form-box">

          <h2 class="mb-4 fw-bold text-center">ĐĂNG NHẬP</h2>

          <Form @submit="submitForm" :validation-schema="schema">

            <div class="mb-3">
              <label class="form-label">Email</label>
              <Field name="email" type="email" class="form-control" placeholder="email@gmail.com" />
              <ErrorMessage name="email" class="text-danger small" />
            </div>

            <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" />
                <ErrorMessage name="password" class="text-danger small" />
              </div>

            <button class="btn btn-primary w-100 py-2 mt-2">Đăng nhập</button>
          </Form>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import staffService from "@/services/staff.service";
export default {
  components: { Form, Field, ErrorMessage },

  data() {
    return {
      schema: Yup.object({
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: Yup.string()
          .min(6, "Mật khẩu tối thiểu 6 ký tự")
          .required("Vui lòng nhập mật khẩu"),
      }),
    };
  },

  methods: {
    async submitForm(values) {
      try {
        console.log(values)
        const res = await staffService.login(values)
        const token = res.data.token

        localStorage.setItem("token", token)
        this.$router.push({ name: "books" })
      } catch (err) {
        alert(err.response.data.message || "Đăng nhập thất bại" )
      }
    }
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
