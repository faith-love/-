<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloadShow">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title" v-html="article.title"></h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <Follow
            :articleId="article.aut_id"
            class="follow-btn"
            v-model="article.is_followed"
          ></Follow>
          <!-- <Follow
            :isFollow="article.is_followed"
            :articleId="article.aut_id"
            class="follow-btn"
            @update-is_followed="article.is_followed = $event"
          ></Follow> -->
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            :loading="isFollowed"
            size="small"
            @click="onFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="isFollowed"
            @click="onFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article_content"
          v-html="article.content"
        >
          }
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
       <CommentList :articleId='article.art_id' :comment_count='totalCommentCount' @total_count='totalCommentCount=$event'/>
        <!-- 评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <Collect_article
            class="btn-item"
            v-model="article.is_collected"
            :article_id="article.art_id"
          />
          <Like_article
            class="btn-item"
            :attitudeNum.sync='article.attitude'
            :article_id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isnotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="get_Article_Detail"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import { ImagePreview } from "vant";
import Follow from "@/components/follow";
import Collect_article from "@/components/collect";
import Like_article from "@/components/like";
import CommentList from './components/comment-list'

export default {
  name: "ArticleIndex",
  components: { Follow, Collect_article, Like_article,CommentList },
  props: {
    // 使用props获取动态路由的数据
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},
      isloadShow: false,
      isnotFound: false,
      isFollowed: false,
      totalCommentCount:0  // 文章评论总数量
    };
  },
  computed: {},
  watch: {},
  created() {
    this.get_Article_Detail();
  },
  mounted() {},
  methods: {
    async get_Article_Detail() {
      this.isloadShow = true;
      try {
        const { data: res } = await getArticleDetail(this.articleId);
        this.article = res.data;
        console.log(this.article);
        setTimeout(() => {
          this.getimages();
        }, 0);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          this.isnotFound = true;
        }
      }
      this.isloadShow = false;
    },
    getimages() {
      const content = this.$refs["article_content"];
      const imgs = content.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            closeable: true
          });
        };
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../public/github-markdown-css-main/github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
