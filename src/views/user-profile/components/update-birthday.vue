<template>
  <div class="update-birthday">
    <!--
      currentDate 双向绑定了日期选择器
        设置日期选择器的默认值
        同步日期选择器选择的日期
      min-date: 可选的最小日期
      max-date: 可选的最大日期
     -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
import dayjs from "dayjs";

export default {
  name: "UpdateGender",
  components: {},
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: this.value ? new Date(this.value) : new Date()
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 确定事件
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      });
      try {
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        await editUserProfile({
          birthday: currentDate
        });
        // 更新视图
        // this.value=this.message
        this.$emit("input", currentDate);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        console.log(error);
        this.$toast.fail("更新失败");
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
