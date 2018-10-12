<style type="text/css">

.error_info{
    color: #ef0909cf;
    margin-top: 10px;
    background: #f3f3f3;
    padding: 10px;
}

.account_info{
    color: #ef0909cf;
    margin-top: 10px;
    background: #f3f3f3;
    padding: 10px;
}
</style>

<template>
   <div>
        <template v-if="has_scatter">
             <div>
                <a href="javascript:;" @click="call_scatter" class="blue_ft">登录</a>
                <a href="javascript:;" @click="transfer" class="blue_ft">转账</a>
                <a href="javascript:;" @click="recast" class="blue_ft">复投</a>
                <div  class="error_info">
                    {{ scatter_error_info }}
                </div>
                <div  v-if="has_account_name" class="account_info">
                    账户名称是：{{ account_name }}
                </div>
            </div>
        </template>
   </div>    
</template>

<script>
import store from '../data/store.js'
import {
   get_scatter_identity,
   login,
   transfer,
   recast
} from '../services/web_wallet_service.js'


export default {
  name: 'HelloWorld',
  data () {
    return {
      available: '',
      scatter_error_info: '',
      account_name:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    
  },
  components: {
  },
  computed: {
        has_account_name () {
            if(!this.account_name ) return '';
            return this.account_name;
        },
        has_scatter () {
            return store.state.global_config.has_scatter;
        }
    },
  methods: {
    async get_available(is_circle) {
            if(!this.page_index) return ;
            if(this.is_on_load) return ;
            this.is_on_load = true;
            this.available = await get_available();
            if(this.available.is_error){
                this.scatter_error_info = this.available.msg.message;
            }
            if(!is_circle) return ;
            setTimeout(async () => {
                this.is_on_load = false;
                await this.get_available(is_circle);
            }, 3000);
    },
    async transfer () {
      let res = await transfer();

    },
    async recast() {
      let res = await recast()
    },
    async login() {
      let res = await login();
    },
    async call_scatter () {
            let res = await get_scatter_identity();
            alert('测试')
            if(res.is_error){
                this.scatter_error_info = res.msg.message;
            }else{
                this.account_name = res.data.account_name
               // window.location.reload(1);    
            }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
