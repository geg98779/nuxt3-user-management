<template>
  <div class="bg-white rounded-lg p-6">
    <h2 class="text-lg font-semibold mb-4">设备数据统计</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 错误类型分布 -->
      <div class="h-80">
        <div ref="errorTypeChart" class="w-full h-full"></div>
      </div>
      <!-- 错误趋势 -->
      <div class="h-80">
        <div ref="errorTrendChart" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { ErrorMsg } from '~/types/device'

const props = defineProps<{
  errorMsgs: ErrorMsg[]
}>()

const errorTypeChart = ref<HTMLElement | null>(null)
const errorTrendChart = ref<HTMLElement | null>(null)
let errorTypeChartInstance: echarts.ECharts | null = null
let errorTrendChartInstance: echarts.ECharts | null = null

// 初始化错误类型分布图表
const initErrorTypeChart = () => {
  if (!errorTypeChart.value) return

  errorTypeChartInstance = echarts.init(errorTypeChart.value)
  const option = {
    title: {
      text: '错误类型分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '错误类型',
        type: 'pie',
        radius: '50%',
        data: [
          { value: props.errorMsgs.filter(msg => msg.type === '1').length, name: '告警' },
          { value: props.errorMsgs.filter(msg => msg.type === '2').length, name: '错误' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  errorTypeChartInstance.setOption(option)
}

// 初始化错误趋势图表
const initErrorTrendChart = () => {
  if (!errorTrendChart.value) return

  errorTrendChartInstance = echarts.init(errorTrendChart.value)
  
  // 按日期分组统计错误数量
  const errorCountByDate = props.errorMsgs.reduce((acc, msg) => {
    const date = msg.cTime.split(' ')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const dates = Object.keys(errorCountByDate).sort()
  const counts = dates.map(date => errorCountByDate[date])

  const option = {
    title: {
      text: '错误趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '错误数量',
        type: 'line',
        data: counts,
        smooth: true,
        areaStyle: {
          opacity: 0.3
        }
      }
    ]
  }
  errorTrendChartInstance.setOption(option)
}

// 监听窗口大小变化，调整图表大小
const handleResize = () => {
  errorTypeChartInstance?.resize()
  errorTrendChartInstance?.resize()
}

onMounted(() => {
  initErrorTypeChart()
  initErrorTrendChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  errorTypeChartInstance?.dispose()
  errorTrendChartInstance?.dispose()
})
</script> 