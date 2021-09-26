<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="登录">
      <template #left>
        <!-- 后退上一页:  $router.back() 或 $router.go(-1) -->
        <van-icon name="cross"
                  @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit"
              ref="loginForm">
      <van-field v-model="user.mobile"
                 name="mobile"
                 placeholder="请输入手机号"
                 :rules='userFormRules.mobile'
                 type=number
                 maxlength=11>
        <i slot="left-icon"
           class="Toutiao Toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code"
                 name="code"
                 placeholder="请输入验证码"
                 :rules='userFormRules.code'
                 maxlength=6>
        <i slot="left-icon"
           class="Toutiao Toutiao-yanzhengma"></i>

        <template #button>
          <van-count-down v-if='iscountdownshow'
                          :time="time"
                          format="ss秒"
                          @finish='iscountdownshow=false' />
          <van-button v-else
                      class="send-sms-btn"
                      round
                      size="small"
                      type="default"
                      native-type="button"
                      @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    block
                    type="info"
                    native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import {login,loginSms} from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      iscountdownshow:false,
      time:  60 * 1000,
      user:{
        mobile:16714433480,
        code:246810
      },
      userFormRules:{
        mobile:[{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|6|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code:[{require:true,message:'验证码不能为空！'},{ pattern:/^\d{6}$/, message: '验证码格式错误！' }],
      }
    }
  },
  computed: {},
  watch: {},
  
  mounted () {},
  methods: {
    
   async onSubmit () {
      // console.log('submit', values)
      const user=this.user //获取输入信息
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      });

      try {
         const {data:res}= await login(user)
           console.log(res);
           this.$store.commit('set_token', res.data);
           this.$toast.success('登录成功！');
           this.$router.push('./my')
      } catch (error) {
        if(error.response.status===400) 
        {console.log("手机号或密码输入错误！");
        this.$toast.fail('手机号或密码输入错误！')}
        else{
          console.log('未知错误，请稍后登录！'),
         this.$toast.fail('未知错误，请稍后登录！')
        }
      }
    },

    async onSendSms(){
      console.log('onSendSms');
      //this.$refs的validate验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        } catch (error) {
        this.$toast.loading({
              message: '校验手机号失败...',
              forbidClick: true,
            });
        return console.log('校验手机号失败',error);
      }
      this.iscountdownshow=true
      //发送验证码
      try {
        await loginSms(this.user.mobile)
        this.$toast('发送成功！');
      } catch (error) {
        if(error.response.status===429) return  this.$toast('请求过于频繁！，请稍后重试！');
      this.iscountdownshow=false
        return  this.$toast('登陆失败！请稍后重试！')
      }

    },
  }
}
</script>
<style scoped lang="less">
.login-container {
  .Toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 165px;
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
}
</style>