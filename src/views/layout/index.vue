<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar  route class="layout-tabbar">
      <van-tabbar-item replace to="/home"><template #icon><i class='Toutiao Toutiao-shouye'></i></template><span class="text">首页</span></van-tabbar-item>
      <van-tabbar-item replace to="/qa"><template #icon><i class='Toutiao Toutiao-shipin'></i></template><span class="text">问答</span></van-tabbar-item>
      <van-tabbar-item replace to="/video"><template #icon><i class='Toutiao Toutiao-sousuo'></i></template><span class="text">视频</span></van-tabbar-item>
      <van-tabbar-item replace to="/my"><template #icon><i class='Toutiao Toutiao-wode'></i></template><span class="text">{{$store.state.user?'我的':'未登录'}}</span></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.layout-container {
  .layout-tabbar {
    i.Toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>