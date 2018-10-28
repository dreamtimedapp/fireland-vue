<template>
<div> 
  <el-dialog
  title="分享"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
  <span>邀请好友永久享受2%分红</span>
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

} from './services/get_data_service.js'
export default {
  name: 'fab',
  props: {},
  data: function() {
    return {
      account_name: '',
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
                tooltip: '分享', 
                color:'#F56C6C',
            },
            {
                name: 'sign',
                icon: 'add_alert', 
                tooltip: '每日签到领lemon币',
                color:'#67C23A'
            }
        ],
        iconSizes:'medium',
        position: 'bottom-right',
        tooltipEvent: 'hover',
        mainIcon: 'add',
        enableRotation: true,
        message:'邀请好友享受永久分红'
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
      
        this.$copyText(this.message).then(function (e) {
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
        this.dialogVisible = false
    },
    async sign () {
     let res =  await sign_onday()
    
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

<style scoped>


</style>
