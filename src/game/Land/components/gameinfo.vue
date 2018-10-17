<template>
    <div class="game-info">  
        <div><countdown :time="2 * 24 * 60 * 60 * 1000">
        <template slot-scope="props">
          <span class="total_balance">{{ props.days }} : {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}</span>
        </template>
</countdown></div>
        <span class="total_balance"> 总计下注：1000 EOS</span>
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
  .game-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 300px;
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