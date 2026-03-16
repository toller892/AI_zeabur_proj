<template>
  <el-container class="app-shell">
    <el-aside width="260px" class="sidebar">
      <div class="brand">
        <div class="brand-mark">AI</div>
        <div>
          <div class="brand-title">AI Share Admin</div>
          <div class="brand-subtitle">Element Plus static demo</div>
        </div>
      </div>

      <div class="menu-label">Navigation</div>
      <el-menu default-active="1" class="menu" :collapse="false">
        <el-menu-item index="1">
          <span>Overview</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>Signups</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>Lottery</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>Members</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar-card">
        <div class="sidebar-card-label">Meeting</div>
        <div class="sidebar-card-title">Friday · 10:15 AM</div>
        <div class="sidebar-card-desc">Static homepage demo first. No business logic connected yet.</div>
      </div>
    </el-aside>

    <el-container>
      <el-header class="topbar">
        <div>
          <div class="topbar-title">Dashboard</div>
          <div class="topbar-subtitle">Vue + Element Plus rebuild</div>
        </div>
        <el-tag type="primary" effect="light" round>4 speakers / round</el-tag>
      </el-header>

      <el-main class="main-area">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
</script>
