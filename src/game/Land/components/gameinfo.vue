<template>
    <div class="info">  
        <div><countdown :time="2 * 24 * 60 * 60 * 1000">
        <template slot-scope="props">
          <span class="total_balance">{{ props.days }} : {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}</span>
        </template>
</countdown></div>
        <span class="total_balance"> 总计下注：1000 EOS</span>
        <span class="personal">我拥有土地0块 </span>
    </div>
</template>
<script>

export default {
    ready() {
    },
    components: {
       
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 600px;
  }
  .total_balance {
    color: #000;
    font-size: 60px;
  }
  .personal {
    color: #000;
    font-size: 60px;
    
  }

</style>