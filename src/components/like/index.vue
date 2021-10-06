<template>
  <van-button
    :icon="attitudeNum === 1 ? 'good-job' : 'good-job-o'"
    :class="{ collected: attitudeNum===1 }"
    @click="onLike"
    :loading="onloading"
  />
</template>

<script>
import { addLike, cancelLike } from "@/api/article";
export default {
  props: {
    attitudeNum: {
      type: Number,
      required: true
    },
    article_id: {
      type: [Object, Number, String],
      required: true
    }
  },
  data() {
    return {
      onloading: false
    };
  },
  methods: {
    async onLike() {
      this.onloading = true;
      try {
        let status = -1;
        if (this.attitudeNum === 1) {
          //取消点赞
          await cancelLike(this.article_id);
        } else {
          await addLike(this.article_id);
          status = 1;
        }
        //视图操作
        this.$emit("update:attitudeNum", status);
        this.$toast(status === 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        console.log(error);
        this.$toast("操作失败！请稍后重试！");
      }
      this.onloading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #e5645f;
  }
}
</style>
