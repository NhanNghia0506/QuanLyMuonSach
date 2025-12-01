<template>
 <!-- Admin Sidebar -->
<div class="d-flex">
  <!-- Sidebar -->
  <div class="d-flex flex-column bg-dark text-white p-3 vh-100" style="width: 260px; position: fixed; left: 0; top: 0;">
    <h4 class="text-center mb-4">Admin Panel</h4>

    <ul class="nav flex-column mb-auto">
      <li class="nav-item mb-2">
        <router-link :to="{ name : 'books'}" class="nav-link text-white d-flex align-items-center gap-2"
          >
          <i class="fas fa-book"></i>
          Quản lý sách
        </router-link>
      </li>

      <li class="nav-item mb-2">
        <router-link :to="{ name : 'publisher'}" class="nav-link text-white d-flex align-items-center gap-2"
          >
          <i class="fas fa-book"></i>
          Quản lý nhà xuất bản
        </router-link>
      </li>

      <li class="nav-item mb-2">
        <a href="#" class="nav-link text-white d-flex align-items-center gap-2">
          <i class="fas fa-ticket-alt"></i>
          Phiếu mượn
        </a>
      </li>

      <li class="nav-item mb-2">
        <a href="#" class="nav-link text-white d-flex align-items-center gap-2">
          <i class="fas fa-users"></i>
          Đọc giả
        </a>
      </li>
    </ul>

    <!-- Logout Button at bottom -->
    <div class="mt-auto pt-3 border-top">
      <a href="#" class="nav-link text-white d-flex align-items-center gap-2">
        <i class="fas fa-sign-out-alt"></i>
        Đăng xuất
      </a>
    </div>
  </div>
</div>

</template>