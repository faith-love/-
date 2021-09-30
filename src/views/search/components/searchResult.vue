<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <div slot="title" v-html="item.title"></div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    suggest_text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:20
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q:this.suggest_text
        });
        console.log(res);
        const results=res.data.results
        this.list.push(...results)
        this.loading = false;
        if (results.length) {
          this.page++
          }else{
            this.finished = true
          };
      } catch (error) {
        this.$toast("查询失败！");
        console.log(error);
        this.loading = false;
        this.finished = true
      }
    },
    hightLight(q){
      const gl=`<span class="active">${this.suggest_text}</span>`
      const str=new RegExp(this.suggest_text,'gi')
      q.replace(str,gl)
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .active{
  color:red
}
</style>
