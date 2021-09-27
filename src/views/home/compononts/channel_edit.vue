<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channel_list"
        :key="index"
        @click="onMyChannelClick(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannels.includes(item.id)"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: active === index }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        :text="item.name"
        v-for="item in recommendChannels"
        :key="item.id"
        @click="onAddChannels(item)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addChannels, delChannels } from "@/api/channels";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    channel_list: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannelList: [],
      isEdit: false,
      fixedChannels: [0] //数组形式
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      const remChannels = [];
      this.allChannelList.filter(item1 => {
        const res = this.channel_list.find(item2 => item2.id === item1.id);
        if (!res) {
          remChannels.push(item1);
        }
      });
      return remChannels;

      // return this.allChannelList.filter(item1=>{
      //  if(!this.channel_list.find(item2=>item2.id===item1.id)) remChannels.push(item1);
      //  return
      // })
    }
  },
  watch: {},
  created() {
    this.getChannelList();
  },
  mounted() {},
  methods: {
    async getChannelList() {
      try {
        const { data: res } = await getAllChannels();
        console.log(res);
        this.allChannelList = res.data.channels;
      } catch (error) {
        console.log(error);
        this.$toast("所有频道列表获取失败！");
      }
    },
    async onAddChannels(item) {
      this.channel_list.push(item);
      //登录与未登录状态下频道列表的存储
      try {
        if (this.user) {
          //登录状态下的操作
          await addChannels({
            id: item.id,
            seq: this.channel_list.length
          });
        } else {
          //为登录状态下的操作
          setItem("article_channels", this.channel_list);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async delUserChannel(data) {
      try {
        if(this.user){
          await delChannels(data)
        }else{
          setItem('article_channels',this.channel_list)
        }
      } catch (error) {
        console.log(error);
      }
    },
    onMyChannelClick(item, index) {
      if (this.isEdit) {
        if (this.fixedChannels.includes(item.id)) return false;
        this.channel_list.splice(index, 1);
        this.delUserChannel(item.id)
        if (index <= this.active) {
          this.$emit("tiggle_active", this.active - 1);
        }
      } else {
        //完成状态时执行的操作
        this.$emit("tiggle_active", index, false);
      }
    }
  }
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
