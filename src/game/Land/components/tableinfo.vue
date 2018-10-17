<template>
    <div class="table-container">  
       <el-table :data="tableData" style="width: 100%">
         <el-table-column prop="date" label="日期" width="180">
         </el-table-column>
         <el-table-column prop="name" label="投注" width="180">
      </el-table-column>
      <el-table-column prop="address" label="宣言">
      </el-table-column>
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
    width: 750px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
   
    margin-top: 50px;
}
</style>