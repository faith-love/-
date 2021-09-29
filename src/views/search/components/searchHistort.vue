<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelShow">
        <span @click='delAll'>全部删除&nbsp;&nbsp;</span>

        <span @click="isDelShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in search_History"
      :key="index"
      @click="historyClick(item, index)"
    >
      <van-icon v-if="isDelShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    search_History: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isDelShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    historyClick(item,index) {
      if (this.isDelShow) {
        //删除历史记录的状态
        this.search_History.splice(index,1)

      }else{
        this.$emit("search",item) 
        console.log("000");
      }
    },
    delAll(){
      this.$emit("del_all")
    }
  }
};
</script>

<style scoped lang="less"></style>
