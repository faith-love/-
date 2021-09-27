<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--animated 滑动的动画 border 底边框线 swipeable 开启左右手势滑动-->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        ><article_list :channel="item"></article_list
      ></van-tab>

      <!-- 右侧自定义内容 -->

      <!-- 右侧按钮 -->
      <template #nav-right>
        <!-- 占位元素 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelsShow = true">
          <i class="Toutiao Toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 图标位置 -->
    <van-popup
      v-model="isChannelsShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Channel_edit
        :channel_list="channels"
        :active="active"
        @tiggle_active="change_active"
      ></Channel_edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import article_list from "./compononts/article_list.vue";
import Channel_edit from "./compononts/channel_edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  components: {
    article_list,
    Channel_edit
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChannelsShow: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.getUserChannels();
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
      } else if (getItem("article_channels")) {
        this.channels = getItem("article_channels");
      }else{
        const { data: res } = await getUserChannels();
          // console.log(res.data.channels);
          this.channels = res.data.channels;
      }
    },

    change_active(val, isChannelsShow = true) {
      this.active = val;
      this.isChannelsShow = isChannelsShow;
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // tabs 标签导航也设置为固定定位
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }

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
      flex-shrink: 0 !important;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.Toutiao {
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
  }
}
</style>
