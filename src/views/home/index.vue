<template>
  <div class="home-container">
    <!-- 头部 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        type="info"
        slot="title"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 头部 -->

    <!--
animated 滑动的动画
border 底边框线
swipeable 开启左右手势滑动
-->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab  v-for="item in Article_list"  :key="item.id"  :title="item.name"><Art_list  :channel="item"></Art_list></van-tab>
      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right">
        <div class="placeholder"></div>

        <div class="hamburger-btn" @click="isPopupshow = true">

          <i class="Toutiao Toutiao-gengduo"></i>
        </div>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 图标位置 -->
    <van-popup
      class="edit-channel-popup "
      v-model="isPopupshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
      ><ChannelEdit
        :channels="channels"
        :active="active"
        @change_active="changeActive"
      ></ChannelEdit
    ></van-popup>
  </div>
</template>

<script>

import { getUserChannels } from "@/api/user";
import article_list from "./components/article_list.vue";
import ChannelEdit from "./components/channel_edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";


export default {
  name: "HomePage",
  components: {

    article_list,
    ChannelEdit

  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isPopupshow: true
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.getUserArtList();
  },
  mounted() {},
  methods: {

    async getUserChannels() {
      if (this.user) {
        try {
          const { data: res } = await getUserChannels();
          // console.log(res.data.channels);
          this.channels = res.data.channels;
        } catch (error) {
          console.log(error);
          this.$toast("获取频道数据失败");
        }
      } else if(getItem("userChannels")) {
       this.channels= getItem("userChannels");
      }else{
        try {
          const { data: res } = await getUserChannels();
          // console.log(res.data.channels);
          this.channels = res.data.channels;
        } catch (error) {
          console.log(error);
          this.$toast("获取频道数据失败");
        }

      }
    },
    changeActive(index, isPopupshow = true) {
      this.isPopupshow = isPopupshow;
      this.active = index;
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}
/deep/ .channel-tabs {
  padding-top: 95px;
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }

  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    i.Toutiao {
      position: fixed;
      right: 0;
      top: 95px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .edit-channel-popup {
    box-sizing: border-box;
  }
}
</style>
