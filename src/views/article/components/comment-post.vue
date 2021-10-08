<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="add_comment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "CommentPost",

  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      dafault: "a",
      validator(val) {
        return ["a", "c"].includes(val);
      }
    }
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async add_comment() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      });
      try {
        const { data: res } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.type === "a" ? null : this.articleId.toString()
        });
        console.log(res.data);
        this.$toast("添加文章评论成功！");
        //清空文本框
        this.message = "";
        // 关闭弹出层
        this.$emit("show", res.data);
        // 将发布内容显示到列表顶部
      } catch (error) {
        console.log(error);
        this.$toast("添加文章评论失败！");
      }
    }
  }
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
