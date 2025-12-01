<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Đặt mượn sách</a>

        <!-- Search box -->
        <div class="mx-3 search-wrapper" @click.stop>
          <div class="search-input">
            <i class="fas fa-search search-icon" aria-hidden="true"></i>
            <input
              v-model="query"
              @focus="open = true"
              @keydown.escape="close()"
              @keydown.enter.prevent="selectFirst()"
              type="search"
              class="form-control"
              placeholder="Tìm sách, tác giả, mã phiếu..."
              aria-label="Tìm kiếm"
            />
          </div>

          <ul v-if="open && results.length" class="search-dropdown list-group">
            <li
              v-for="(item, idx) in results"
              :key="idx"
              class="list-group-item list-group-item-action"
              @click="select(item)"
            >
              <div class="fw-bold">{{ item.name }}</div>
              <div class="small text-muted">{{ item.publisherId.name }}</div>
            </li>
          </ul>
        </div>

        <!-- Menu trái -->
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'borrowlist' }" class="nav-link">
                  Phiếu mượn
                  <i class="fas fa-ticket-alt"></i>
              </router-link>
            </li>
        </div>

        <!-- Menu phải: login/logout -->
        <div class="navbar-nav ms-auto">
            <!-- Nếu chưa đăng nhập -->
            <li v-if="!token" class="nav-item">
              <router-link :to="{ name: 'register' }" class="nav-link">
                Đăng ký
                <i class="fas fa-user-plus"></i>
              </router-link>
            </li>

            <!-- Nếu đã đăng nhập -->
            <li v-else class="nav-item">
              <button class="nav-link btn btn-link text-light" @click="logout">
                Đăng xuất
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </li>
        </div>
    </nav>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// token — kiểm tra login
const token = ref(localStorage.getItem("token") ?? null)

function logout() {
  localStorage.removeItem("token")
  token.value = null
  router.push({ name: 'login' })
}

const query = ref('')
const results = ref([])
const open = ref(false)
let timer = null

// debounce search
watch(query, (q) => {
  results.value = []
  if (timer) clearTimeout(timer)
  if (!q || q.trim().length < 1) return
  timer = setTimeout(() => fetchResults(q.trim()), 350)
})

async function fetchResults(q) {
  try {
    const res = await axios.get(`/api/book/?search=${encodeURIComponent(q)}`)
    results.value = res.data.books || []
    open.value = results.value.length > 0
  } catch (err) {
    console.error(err)
    results.value = []
    open.value = false
  }
}

function select(item) {
  open.value = false
  query.value = item.title || item.name || ''
  router.push({
    name: 'bookdetail',
    params: { id: item._id }
  })
}

function selectFirst() {
  if (results.value.length) select(results.value[0])
}

function close() {
  open.value = false
}

onMounted(() => {
  document.addEventListener('click', () => (open.value = false))
})
</script>



<style>
/* ...existing code... */
.navbar {
  padding: 14px 30px !important;
  background: #1f1f1f !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Logo / Brand */
.navbar-brand {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff !important;
  transition: 0.2s;
}

.navbar-brand:hover {
  opacity: 0.85;
}

/* Nav link */
.nav-link {
  font-size: 16px;
  font-weight: 500;
  color: #e6e6e6 !important;
  padding: 8px 14px !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.25s, color 0.25s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff !important;
}

/* Khi đang ở route hiện tại (router-link active) */
.router-link-active {
  background: rgba(255,255,255,0.18);
  color: #fff !important;
  font-weight: 600;
}

/* Icon */
.nav-link i {
  font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 18px !important;
  }

  .navbar-brand {
    font-size: 18px;
  }
}

/* Search styles */
.search-wrapper {
  position: relative;
  width: 340px;
  max-width: 45%;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #9aa0a6;
  z-index: 2;
}

.search-input input.form-control {
  padding-left: 36px;
  background: #ffffff;
  border-radius: 8px;
  height: 38px;
  border: none;
}

.search-input input.form-control:focus {
  outline: none;
  box-shadow: 0 0 0 0.15rem rgba(108,117,125,0.15);
}

/* dropdown */
.search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 320px;
  overflow: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  padding: 0;
}

.search-dropdown .list-group-item {
  cursor: pointer;
  border: none;
  padding: 10px 12px;
}

.search-dropdown .list-group-item:hover {
  background: #f6f6f6;
}

</style>