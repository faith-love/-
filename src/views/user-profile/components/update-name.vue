<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="edit_name"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async edit_name() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      });
      try {
        const message = this.message;
        if (!message.length) return this.$toast("昵称不能为空");
        await editUserProfile({
          name: message
        });
        // 更新视图  
        // this.value=this.message
        this.$emit("input", message);
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

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
