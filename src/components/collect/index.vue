<template>
  <van-button
    :icon="isCollected ? 'star' : 'star-o'"
    :class="{ collected: isCollected }"
    @click="onCollect"
    :loading="onloading"
  ></van-button>
</template>

<script>
import { addCollect, cancelCollect } from "@/api/article";
export default {
  name: "collect_article",
  model:{
    prop:'isCollected',
    event:'updateCollect'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    article_id: {
      type: [Object, Number, String],
      required: true
    }
  },
  data() {
    return {
      onloading:false
    };
  },
  methods: {
    async onCollect() {
      this.onloading = true;
      try {
        if (this.isCollected) {
          await cancelCollect(this.article_id);
        } else {
          await addCollect(this.article_id);
        }
        //更新视图
        this.$emit('updateCollect', !this.isCollected)
        this.$toast.success(!this.isCollected?'收藏成功！':'取消成功！')
      } catch (error) {
        this.$toast.fail('操作失败！请稍后重试！')
      }
      this.onloading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
