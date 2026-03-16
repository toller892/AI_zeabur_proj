<template>
  <div class="dashboard-page">
    <div class="hero-row">
      <div>
        <el-tag type="primary" effect="light" round>Overview</el-tag>
        <h1 class="page-title">Scheduling Overview</h1>
        <p class="page-desc">先做静态首页样板，只看框架和样式，不接报名、抽签、轮转逻辑。</p>
      </div>
      <el-card shadow="hover" class="meeting-card">
        <template #header>Standing Meeting</template>
        <div class="meeting-time">Friday 10:15 AM</div>
        <div class="meeting-desc">Weekly AI sharing session</div>
      </el-card>
    </div>

    <el-row :gutter="16" class="stats-row">
      <el-col :span="6" v-for="item in stats" :key="item.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-label">{{ item.title }}</div>
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-hint">{{ item.hint }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="section-header">Select Meeting Date</div>
      </template>
      <div class="date-buttons">
        <el-button v-for="(d, i) in dates" :key="d" :type="i === 0 ? 'primary' : 'default'" plain>{{ d }}</el-button>
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col :span="15">
        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="header-inline">
              <span class="section-header">Current Round Lineup</span>
              <el-tag type="success" round>Ready</el-tag>
            </div>
          </template>

          <div class="lineup-list">
            <div v-for="(item, i) in lineup" :key="item.name" class="lineup-item">
              <div class="lineup-index">{{ i + 1 }}</div>
              <div class="lineup-content">
                <div class="lineup-name-row">
                  <span class="lineup-name">{{ item.name }}</span>
                  <el-tag :type="item.type === '报名' ? 'primary' : 'warning'" effect="light" round>{{ item.type }}</el-tag>
                </div>
                <div class="lineup-topic">{{ item.topic }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="9">
        <el-card shadow="never" class="section-card side-card">
          <template #header>Next Round Queue</template>
          <div class="queue-item" v-for="item in queue" :key="item.name">
            <div class="queue-name">{{ item.name }}</div>
            <div class="queue-topic">{{ item.topic }}</div>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card side-card">
          <template #header>Recent History</template>
          <div class="history-item" v-for="item in history" :key="item.date">
            <div class="history-top">
              <span>{{ item.date }}</span>
              <el-tag type="info" round>Completed</el-tag>
            </div>
            <div class="history-people">{{ item.people.join(' · ') }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { title: 'Current round', value: '4', hint: 'Fixed 4 speakers each round' },
  { title: 'Pending signups', value: '5', hint: 'Ordered by signup time' },
  { title: 'Shared this cycle', value: '8 / 12', hint: 'Reset after full rotation' },
  { title: 'Queued next', value: '3', hint: 'Overflow auto carried forward' },
]

const dates = [
  '2026-03-20 Fri 10:15',
  '2026-03-27 Fri 10:15',
  '2026-04-03 Fri 10:15',
  '2026-04-10 Fri 10:15',
]

const lineup = [
  { name: '张三', type: '报名', topic: '多 Agent 工作流设计' },
  { name: '李四', type: '报名', topic: 'RAG 评测与检索调优' },
  { name: '王五', type: '抽签', topic: '待定主题（抽签补位）' },
  { name: '赵六', type: '抽签', topic: '待定主题（抽签补位）' },
]

const queue = [
  { name: '孙七', topic: '企业知识库接入方案' },
  { name: '周八', topic: '模型路由实验总结' },
  { name: '吴九', topic: 'Prompt 安全防护实践' },
]

const history = [
  { date: '2026-03-13', people: ['陈二', '刘三', '黄四', '钱一'] },
  { date: '2026-03-06', people: ['郑十', '张三', '李四', '赵六'] },
]
</script>
