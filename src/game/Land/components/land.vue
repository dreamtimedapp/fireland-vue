<template>
  <div id="land">
    <div class="list" ref="list" :style="{height: listHeight}">
      <div class="row" v-for="(row, index) in list" :key="index">
        <div class="col" v-for="col in row" :key="col.id" :style="col.style"></div>
      </div>
    </div>
  </div>
</template>

<script>

const STATUS_ENUM = {
  nature: {
    color: '#ccc'
  },
  private: {
    color: '#f00'
  },
  rare: {
    color: '#000'
  }
};
const mock = [];
for (let i=0; i < 11; i++) {
  const row = [];
  for (let j=0; j < 11; j++) {
    const col = {
      id: i*10 + j
    };
    const k =  1 + parseInt(Math.random(6)*3);
    if (k === 1) {
      col.status = 'nature';
    } else if (k === 2) {
      col.status = 'private';
    } else {
      col.status = 'rare';
    }

    col.style = {
      background: STATUS_ENUM[col.status].color
    };
    
    row.push(col);
  }
  mock.push(row);
}

export default {
  name: 'Land',
  components: {
  },
  props: {},
  data: function() {
    return {
      listHeight: 0,
      list: mock
    }
  },
  methods: {

  },
  mounted: function() {
    const listWidth = this.$refs.list.clientWidth;
    console.log(listWidth);
    this.listHeight = listWidth + 'px';
  }
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  #land {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f7f8fa;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .col {
    flex: 1;
    border-top: solid 1px #3385ff;
    border-left: solid 1px #3385ff;
  }
  .col:last-child {
    border-right: solid 1px #3385ff;
    border-bottom: solid 1px #3385ff;
  }
</style>
