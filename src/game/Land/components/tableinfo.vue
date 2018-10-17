<template>
    <div class="table-container">  
       <el-table :data="tableData" :stripe="true">
         <div class="row-item3">
         <el-table-column prop="date" label="日期" width="180">
         </el-table-column>
         <el-table-column prop="name" label="投注" width="180">
         </el-table-column>
         <el-table-column prop="address" label="宣言">
         </el-table-column>
         </div>
      </el-table>
    </div>
</template>
<script>
export default {
    ready() {
    },
   
    data() {
      return {
           tableData: [{
            date: '2018-05-02',
            name: '0.1 EOS',
            address: '抢地皮赢大奖'
          }, {
            date: '2018-05-04',
            name: '1 EOS',
            address: '抢地皮赢大奖'
          },  {
            date: '2018-05-04',
            name: '1 EOS',
            address: '抢地皮赢大奖'
          }, {
            date: '2018-05-04',
            name: '1 EOS',
            address: '抢地皮赢大奖'
          }]
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
.table-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}
.row-item3 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px
}
</style>