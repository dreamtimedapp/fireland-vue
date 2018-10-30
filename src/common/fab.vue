<template>
<div> 
  <el-dialog
  title="邀请好友获奖励"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
  <span>{{this.getInviteMessage}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doCopy">复 制</el-button>
  </span>
  </el-dialog>
  <vue-fab
    :position="position"
    :icon-size="iconSizes"
    :position-type="positionType"
    bg-color="#409EFF"
    :main-icon="mainIcon"
    :actions="actions"
    @jumpHome="jumpHome"
    @refresh ="refresh"
    @sign = "sign"
    @share = "share"
    :fixed-tooltip="fixedTooltip"
    :enable-rotation="enableRotation">
  </vue-fab> 
  </div>
</template>

<script>
import {get_sign_all,
        sign_onday

} from '../services/get_data_service.js'
import store from '../store'
import { EOS_Inviter } from '../config/config.js'
export default {
  name: 'fab',
  props: ['account'],
  data: function() {
    return {
      eos_balance:'',
      dialogVisible: false,
      positionTypes: [
            'fixed',
            'absolute'
      ],
      tooltipEvents: [
            'hover',
      ],
      actions:[
            {
                name: 'jumpHome',
                icon: 'home', 
                tooltip: '主页', 
                color:'#000',
            },
            {
                name: 'refresh',
                icon: 'refresh', 
                tooltip: '刷新', 
                color:'#E6A23C',
            },
            {
                name: 'share',
                icon: 'share', 
                tooltip: '邀请好友享受永久分红', 
                color:'#F56C6C',
            },
            {
                name: 'sign',
                icon: 'add_alert', 
                tooltip: '签到送柠檬通证，即时到账',
                color:'#67C23A'
            }
        ],
        iconSizes:'medium',
        position: 'bottom-right',
        tooltipEvent: 'hover',
        mainIcon: 'add',
        enableRotation: true,
    }
  },
  mounted: function() {
   
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    fixedTooltip() {
      return this.tooltipEvent === 'fixed';
    },
    getInviteMessage() {
      return 'EOS 国土无双，我的土地我称雄，邀请好友享受永久分红，专属邀请链接：' + this.getPersonalInviteUrl() 
    },
    getAccout() {
      return this.account
    }
  },
  methods: {
    jumpHome(){
      location.href= '/#/home'
    },
    refresh() {
      location.reload()
    },
    doCopy() {
        let inviteMessage = 'EOS 国土无双，我的土地我称雄，邀请好友享受永久分红，我的邀请链接：' + this.getPersonalInviteUrl()
        this.$copyText(inviteMessage).then(function (e) {
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
        this.dialogVisible = false
    },
    getPersonalInviteUrl() {
        return "http://www.lemonfun.io/#/game/land?ref=" + this.account;
    },
    async sign () {
      let res =  await sign_onday(this.account)
      if (res) {
        let result = EOS_Inviter(this.account)
        if (result) {
          alert("领取 LEN 成功")
        } else {
          alert("已达到今日限量，请明日再来")
        }
      } 
    },
    share () {
       this.dialogVisible = true;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
    
  }
}
</script>

