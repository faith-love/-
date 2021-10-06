<template>
  <van-button
    v-if="isFollow"
    class="follow-btn"
    round
    :loading="isFollowed"
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowed"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { getFollow, cancelFollow } from "@/api/article";

export default {
  model: {
    prop:'isFollow',
    event:'update-is_followed'
  },
  props:{
    isFollow:{
      type:Boolean,
      required:true
    },
    articleId:{
      type:[String,Number,Object],
      required:true
    }
  },
  data() {
    return {
      isFollowed: false,
    };
  },
  methods: {
    async onFollow() {
      if (!this.$store.state.user) return this.$toast("未登录！请先登录！");
      this.isFollowed = true;
      try {
        if (this.isFollow) {
          await cancelFollow(this.articleId);
        } else {
          await getFollow(this.articleId);
        }
        this.$emit('update-is_followed',!this.isFollow)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast("你不能关注你自己！");
        }
      }
      this.isFollowed = false;
    }
  }
};
</script>

<style></style>
