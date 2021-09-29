<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar"> <van-icon slot="left" name="cross" @click="$router.back()" /></van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="form_rules.mobile"
      >
        <i slot="left-icon" class="Toutiao Toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="form_rules.code"
      >
        <i slot="left-icon" class="Toutiao Toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss秒"
            v-if="iscountdownshow"
            @finish="iscountdownshow = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;" class="login-btn-wrap">
        <van-button
          block
          type="info"
          native-type="submit"
          class="login-btn"
          @click="onLogin"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getMsg } from "@/api/user";

export default {
  data() {
    return {
      time: 6 * 1000,
      iscountdownshow: false,
      user: {
        mobile: "16714433480",
        code: "246810"
      },
      form_rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            pattern: /^1[3|5|6|7|8]\d{9}$/,
            message: "手机号格式错误"
          }
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}/, message: "验证码格式错误" }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      try {
        const res = await login(user);
        console.log(res);
        this.$toast.success({
          message: "登录成功！",
          forbidClick: true,
          duration: 1000
        });
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.loading({
            message: "手机号或验证码输入错误！",
            forbidClick: true
          });
          return console.log(error);
        } else {
          this.$toast.loading({
            message: "未知错误！",
            forbidClick: true
          });
        }
      }
    },

    async onSendSms() {
      //1.验证手机号
      try {
        console.log(4);
        await this.$refs.loginForm.validate("mobile");
        this.iscountdownshow = true;
      } catch (error) {
        console.log(error);
        return this.$toast.loading({
          message: "校验手机号失败...",
          forbidClick: true
        });
      }

      //2.发送数据请求
      try {
        await getMsg(this.user.mobile);
        this.$toast.success("发送成功！");
      } catch (error) {
        if (error.response.status === 404)
          return this.$toast.fail("手机号不正确");
        if (error.response.status === 429)
          return this.$toast.fail("短信发送过于频繁！请稍后重试！");
        this.iscountdownshow = false;
        return this.$toast.fail("发送失败！请稍后重试！");
      }
    },
    //登录
    async onLogin() {
      try {
        const {data:res} = await tologin(this.user);
        // console.log(res.data);
        this.$toast.success('登陆成功！')
        this.$store.commit('set_token', res.data);
      } catch (error) {
        console.log(error);
         if(error.response.status===400) return this.$toast.fail('手机号或密码输入错误！')
        return  this.$toast.fail('登陆失败！请重试！')
      }
    }
  }
};
</script>

<style scope lang="less">
.login-container {
  .Toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .van-button__text {
    font-size: 22px;
  }
}
</style>
