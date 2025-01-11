<template>
  <div class="w-full flex flex-col gap-0.5">
    <VueDatePicker
      v-model="dateRange"
      range
      :enable-time-picker="false"
      :format="'yyyy-MM-dd'"
      :dark="isDark"
      :placeholder="'选择日期范围'"
      :text-input="true"
      @update:model-value="handleDateUpdate"
      :input-class-name="[
        isDark 
          ? 'w-full p-0.5 rounded-lg bg-slate-700/50 text-white border border-white/10 focus:border-sky-500 focus:outline-none text-xs text-center' 
          : 'w-full p-0.5 rounded-lg bg-white text-slate-800 border border-slate-200 focus:border-sky-500 focus:outline-none text-xs text-center'
      ]"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'

const props = defineProps({
  initialValue: {
    type: Array,
    default: () => null
  },
  isDark: {
    type: Boolean,
    required: true
  }
})

const dateRange = ref(null)
const selectedRange = ref(null)

const emit = defineEmits(['update'])

// 处理日期更新
const handleDateUpdate = (dates) => {

  if (!dates) {
    selectedRange.value = null
    emit('update', { holidayTag: null })
    return
  }

  try {
    // 正常的日期范围处理
    if (Array.isArray(dates) && dates.length === 2) {
      // 如果第二个日期为null，则使用第一个日期作为起止日期
      if (dates[0] && !dates[1]) {
        const singleDate = format(dates[0], 'yyyy-MM-dd')
        selectedRange.value = `${singleDate} 至 ${singleDate}`
        emit('update', { holidayTag: [singleDate, singleDate] })
        return
      }

      // 完整的日期范围
      if (dates[0] && dates[1]) {
        const [startDate, endDate] = dates.map(date => format(date, 'yyyy-MM-dd'))
        selectedRange.value = `${startDate} 至 ${endDate}`
        emit('update', { holidayTag: [startDate, endDate] })
        return
      }
    }

    selectedRange.value = null
    emit('update', { holidayTag: null })
  } catch (error) {
    console.error('handleDateUpdate - 日期处理错误:', error)
    selectedRange.value = null
    emit('update', { holidayTag: null })
  }
}

// 监听初始值变化
watch(() => props.initialValue, (newValue) => {

  if (newValue && Array.isArray(newValue) && newValue.length === 2) {
    try {
      // 确保日期格式正确
      const dates = newValue.map(date => {
        if (date instanceof Date) return date
        return new Date(date)
      })

      dateRange.value = dates
      const [startDate, endDate] = dates.map(date => format(date, 'yyyy-MM-dd'))
      selectedRange.value = `${startDate} 至 ${endDate}`
    } catch (error) {
      console.error('日期转换错误:', error)
      dateRange.value = null
      selectedRange.value = null
    }
  } else {
    dateRange.value = null
    selectedRange.value = null
  }
}, { immediate: true, deep: true })
</script>

<style>
.dp__input {
  height: 1.125rem !important;
  padding: 0 0.25rem !important;
  font-size: 0.65rem !important;
  line-height: 1rem !important;
  text-align: center !important;
  width: 100% !important;
}

.dp__input_wrap {
  width: 100% !important;
}

.dp__input_icon {
  right: 0.25rem !important;
  width: 0.5rem !important;
  height: 0.5rem !important;
}

.dp__main {
  width: 100% !important;
  font-size: 0.65rem !important;
}

.dp__calendar_header {
  padding: 0.125rem !important;
  height: 1rem !important;
  min-height: unset !important;
}

.dp__calendar {
  padding: 0.125rem !important;
}

.dp__cell_inner {
  padding: 0 !important;
  height: 1rem !important;
  width: 1rem !important;
  font-size: 0.6rem !important;
  margin: 0.0625rem !important;
}

.dp__month_year_row {
  padding: 0.125rem !important;
  height: 1rem !important;
  min-height: unset !important;
}

.dp__month_year_select {
  height: 1rem !important;
  font-size: 0.6rem !important;
  padding: 0 0.25rem !important;
}

.dp__overlay {
  padding: 0.125rem !important;
}

.dp__action_buttons {
  padding: 0.125rem !important;
  height: 1rem !important;
  min-height: unset !important;
}

.dp__selection_grid_header {
  height: 1rem !important;
  font-size: 0.6rem !important;
  padding: 0.125rem !important;
}

.dp__btn {
  font-size: 0.6rem !important;
  padding: 0.125rem 0.25rem !important;
  height: 1rem !important;
  min-height: unset !important;
}

.dp__selection_grid {
  font-size: 0.6rem !important;
}

.dp__selection_grid_item {
  height: 1rem !important;
  padding: 0.125rem !important;
}

.dp__today {
  height: 1rem !important;
}

.dp__active_date {
  height: 1rem !important;
}

.dp__range_between {
  height: 1rem !important;
}

.dp__range_start, .dp__range_end {
  height: 1rem !important;
}

.dp__menu {
  min-width: unset !important;
  width: auto !important;
  transform: scale(0.9) !important;
  transform-origin: top left !important;
  position: absolute !important;
  right: auto !important;
  left: 0 !important;
  background: var(--dp-background-color) !important;
}

.dp__arrow_top {
  display: none !important;
}

.dp__inner_nav {
  height: 1rem !important;
  width: 1rem !important;
  padding: 0.125rem !important;
}

.dp__month_year_wrap {
  height: 1rem !important;
  min-height: unset !important;
}

.dp__overlay_cell {
  height: 1rem !important;
  font-size: 0.6rem !important;
}

.dp__instance_calendar {
  width: auto !important;
  min-width: unset !important;
}

.dp__pointer {
  padding: 0.125rem !important;
}

.dp__preset_range {
  padding: 0.125rem !important;
  font-size: 0.6rem !important;
}

.dp__month_picker_header {
  height: 1rem !important;
  padding: 0.125rem !important;
}

.dp__year_picker_header {
  height: 1rem !important;
  padding: 0.125rem !important;
}

.dp__overlay_row {
  height: 1rem !important;
}

.dp__container {
  width: 100% !important;
  position: relative !important;
}

.dp__menu_inner {
  padding: 0.25rem !important;
}

.dp__overlay_container {
  width: auto !important;
  position: absolute !important;
  left: 5px !important;
}

.dp__selection_preview {
  font-size: 0.6rem !important;
  padding: 0 0.25rem !important;
}

.dp__theme_dark {
  --dp-background-color: rgb(30, 41, 59) !important;
  --dp-text-color: #fff !important;
  --dp-hover-color: rgb(51, 65, 85) !important;
  --dp-hover-text-color: #fff !important;
  --dp-hover-icon-color: #fff !important;
  --dp-primary-color: rgb(14, 165, 233) !important;
  --dp-primary-text-color: #fff !important;
  --dp-secondary-color: rgb(51, 65, 85) !important;
  --dp-border-color: rgb(51, 65, 85) !important;
  --dp-menu-border-color: rgb(51, 65, 85) !important;
}

.dp__theme_light {
  --dp-background-color: #fff !important;
  --dp-text-color: #212121 !important;
  --dp-hover-color: #f3f3f3 !important;
  --dp-hover-text-color: #212121 !important;
  --dp-hover-icon-color: #959595 !important;
  --dp-primary-color: rgb(14, 165, 233) !important;
  --dp-primary-text-color: #f8f9fa !important;
  --dp-secondary-color: #c0c4cc !important;
  --dp-border-color: #ddd !important;
  --dp-menu-border-color: #ddd !important;
}
</style> 
