<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <Article_item v-for="(item, index) in list" :key="index" :article='item'></Article_item>
    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
  </van-list>
</template>

<script>
import { getNewsArticle } from "@/api/article.js";
import Article_item from "@/components/article-item/index.vue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp:null
    };
  },
  components: {
    Article_item
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      console.log(this.channel.id);
      try {
        const { data } = await getNewsArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        const results = data.data.results;
        console.log(results);
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }

        console.log(this.timestamp);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      // this.loading = true;
    }
  }
};
</script>

<style></style>
