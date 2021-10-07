<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment_replay.reply_count > 0 ?`${comment_replay.reply_count}条回复`:'暂无评论'"
      ><van-icon slot="left" name="cross"  @click="$emit('close')" />
     
    </van-nav-bar>
     <div class="scroll-wrap">
      <!-- 当前评论项 -->
       <comment_item  :comment="comment_replay"/>
      <!-- /当前评论项 -->
      <van-cell title='全部回复'/>
      <!-- 评论的回复列表 -->
      <CommentList type='c' :articleId='comment_replay.com_id'/>
      <!-- /评论的回复列表 -->

    </div>
     <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
   
  </div>
</template>

<script>
import comment_item from "./comment-item";
import CommentList from "./comment-list";

export default {
  name: "CommentReply",
  components: { comment_item ,CommentList},
  props: {
    comment_replay: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
