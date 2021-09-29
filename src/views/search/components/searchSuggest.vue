<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggest_Search"
      :key="index"
      icon="search"
    >
      <div slot="title" v-html="highLight(text)" @click="sendSuggest(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    search_text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggest_Search: []
    };
  },
  computed: {},
  watch: {
    //侦听输入框输入内容
    search_text: {
      // handler(val) {
      //   this.loadSearchSuggest(val);
      // },
      handler: debounce(function(val) {
        this.loadSearchSuggest(val);
      }, 1000),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggest(val) {
      try {
        const { data: res } = await getSearchSuggest(val);
        console.log(res);
        this.suggest_Search = res.data.options;
        console.log(this.suggest_Search);
      } catch (error) {
        console.log(error);
        this.$toast("获取建议搜索建议失败！");
      }
    },
    highLight(text) {
      console.log(text);
      const highlightStr = `<span class="active">${this.search_text}</span>`;
      const reg = new RegExp(this.search_text, "gi");
      return text.replace(reg, highlightStr);
    },
    sendSuggest(text){
      this.$emit("search",text)}
  }
};
</script>

<style scoped lang="less">
/deep/ span.active {
  color:red
}
</style>
