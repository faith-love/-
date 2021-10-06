<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    ></van-cell> -->

    <comment_item :comment='comment' v-for="(comment, index) in list"
      :key="index"/>
    
  </van-list>
</template>
<script>
import { getComments } from "@/api/comment";
import comment_item from './comment-item'
export default {
  name: "CommentList",
  components: {comment_item},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    
  },
  created () {
    this.onLoad()
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      limit: 20,
      offset: null,
      comment_count:0
    };
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getComments({
          type: "a",
          source: this.articleId.toString(),
          offset: this.offset,
          limit: this.limit
        });
        this.comment_count=data.data.total_count
        this.$emit('total_count', this.comment_count)
        const results = data.data.results;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  }
};
</script>
