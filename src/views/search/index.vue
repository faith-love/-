<template>
  <div class="search-container">
    <!--搜索 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow=false"
      />
    </form>
    <!--搜索 -->
    <!-- 搜索结果 -->
    <search_Result v-if="isResultShow" :suggest_text='searchText'></search_Result>
    <!-- 搜索结果 -->
    <!-- 联想建议 -->
    <search_suggest v-else-if="searchText" :search_text='searchText'  @search="onSearch"
    ></search_suggest>
    <!-- 联想建议 -->
    <!-- 历史记录 -->
    <search_History v-else :search_History='search_History' @del_all='search_History=[]' @search="onSearch"></search_History>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import search_suggest from "./components/searchSuggest";
import search_Result from "./components/searchResult.vue";
import search_History from "./components/searchHistort.vue";
import {setItem,getItem} from '@/utils/storage'
export default {
  name: "SearchPage",
  components: {
    search_suggest,
    search_Result,
    search_History
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
      search_History:getItem('history')||[]
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
      this.searchText=val
      if(this.searchText.length===0) return 
      this.isResultShow = true;
      
      console.log(val);
      //保存历史记录
      const index=this.search_History.indexOf(val)
      if(index!==-1){
        this.search_History.splice(index,1)
      }
      this.search_History.unshift(val)
    },
    onCancel() {
      this.$router.back();
    },
  },
  watch:{
    search_History(){
      setItem('history',this.search_History)
    }
  }
};
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
