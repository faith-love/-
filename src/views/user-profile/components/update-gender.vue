<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";

export default {
  name: "UpdateGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value // 当前性别
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
        const localGender = this.localGender;
        await editUserProfile({
          gender: localGender
        });
        // 更新视图
        // this.value=this.message
        this.$emit("input", localGender);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        console.log(error);
        this.$toast.fail("更新失败");
      }
    },
    // 选择器发生变化的时候
    onPickerChange(picker, value, index) {
      this.localGender = index;
    }
  }
};
</script>

<style scoped lang="less"></style>
