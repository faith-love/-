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
        @click="isdone_edit = !isdone_edit"
        >{{ isdone_edit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channels"
        :key="index"
        @click="tiggle_channel(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isdone_edit && !fixedChannels.includes(item.id)"
        ></van-icon>
        <span class="text"
        :class="{ active: index === active }"
         slot="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="(item, index) in recommendChannels"
        :key="index"
        class="grid-item"
        icon="plus"
        :text="item.name"
        @click="add_channels(item)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, add_channel, del_channel } from "@/api/article";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    channels: {
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
      AllChannels: [],
      isdone_edit: false,
      fixedChannels: [0]
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.AllChannels.filter(item => {
        return !this.channels.find(item2 => item2.id === item.id);
      });
    }
  },
  watch: {},
  created() {
    this.getAllChannel();
  },
  mounted() {},
  methods: {
    async getAllChannel() {
      try {
        const { data: res } = await getAllChannels();
        this.AllChannels = res.data.channels;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    async tiggle_channel(item, index) {
      if (this.isdone_edit) {
        //del

        this.channels.splice(index, 1);
        if (this.user) {
          try {
            await del_channel(item.id);
            if (index <= this.active) {
              this.$emit("change_active", this.active - 1);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setItem("userChannels", this.channels);
        }
      } else {
        this.$emit("change_active", index, false);
      }
    },

    async add_channels(item) {
      this.channels.push(item);
      if (this.user) {
        try {
          const res = await add_channel({
            id: item.id,
            seq: this.channels.length
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      } else {
        setItem("userChannels", this.channels);
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
