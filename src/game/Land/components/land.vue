<template>
  <div id="land">
    <div class="list outer-rect" ref="outerList" :style="{height: outerListHeight}">
      <div class="row" v-for="(row, index) in outerList" :key="index">
        <div class="col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          <!--<img :src="col.pic" :style="{opacity: col.status === 'nature' ? 1 : 0.5 }" />-->
        </div>
      </div>
    </div>

    <div class="list inner-rect" ref="innerList" >
      <div class="row" v-for="(row, index) in innerList" :key="index">
        <div class="col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          <!--<img :src="col.pic" :style="{opacity: col.status === 'nature' ? 1 : 0.5 }" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import landImg1 from '../../../assets/land/land-1.png';
import landImg2 from '../../../assets/land/land-2.png';

const STATUS_ENUM = {
  nature: {
    color: '#ccc',
    bg: landImg1,
    pic: landImg1
  },
  private: {
    color: '#f00',
    bg: landImg1,
    pic: landImg1
  },
  rare: {
    color: '#000',
    bg: landImg1,
    pic: landImg1
  }
};
const outerList = [];
const innerList = [];

for (let i=0; i < 9; i++) {
  const row = [];
  for (let j=1; j < 10; j++) {
    const col = {
      id: i*9 + j
    };
//    const k =  1 + parseInt(Math.random(6)*3);
//    if (k === 1) {
//      col.status = 'nature';
//    } else if (k === 2) {
//      col.status = 'private';
//    } else {
//      col.status = 'rare';
//    }

    col.status = 'nature';
    col.pic = STATUS_ENUM[col.status].pic;
    col.style = {
      backgroundImage: 'url(' + STATUS_ENUM[col.status].bg + ')'
    };
    
    row.push(col);
  }
  outerList.push(row);
}

for (let i=0; i < 8; i++) {
  const row = [];
  for (let j=1; j < 9; j++) {
    const col = {
      id: (i*8 + j) + 81
    };
//    const k =  1 + parseInt(Math.random(6)*3);
//    if (k === 1) {
//      col.status = 'nature';
//    } else if (k === 2) {
//      col.status = 'private';
//    } else {
//      col.status = 'rare';
//    }

    col.status = 'nature';
    col.pic = STATUS_ENUM[col.status].pic;
    col.style = {
      backgroundImage: 'url(' + STATUS_ENUM[col.status].bg + ')'
    };

    row.push(col);
  }
  innerList.push(row);
}
console.log(outerList.map((o) => {
  return o.map((item) => {
    return item.id
  })
}));
export default {
  name: 'Land',
  components: {
  },
  props: {},
  data: function() {
    return {
//      listHeight: 0,
      outerListHeight: 0,
//      innerListWidth: 0,
//      innerListHeight: 0,
//      innerListTop: 0,
//      innerListLeft: 0,
//      list: outerList,
      outerList: outerList,
      innerList: innerList
    }
  },
  methods: {

  },
  mounted: function() {
    const outerListWidth = this.$refs.outerList.clientWidth;
//    const outerListHeight = (outerListWidth/330*196);
    const outerListHeight = outerListWidth;
    this.outerListHeight = outerListHeight + 'px';

//    const innerListWidth = outerListWidth * 8/9;
//    const innerListHeight = outerListHeight * 8/9;
//    this.innerListWidth = innerListWidth + 'px';
//    this.innerListHeight = innerListHeight + 'px';
//    this.innerListTop = outerListHeight / 18 + 'px';
//    this.innerListLeft = outerListWidth / 18 + 'px';

    setTimeout(function() {
      const res = {
        "rows": [
          {
            "landID": 41,
            "owner": "firelandc112",
            "price": 10000,
            "type": 0,
            "roundNum": 1
          },
          {
            "landID": 85,
            "owner": "teamaccount",
            "price": 5000,
            "type": 1,
            "roundNum": 0
          }
        ],
        "more": false
      };
    }, 200);
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
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f7f8fa;
    /*justify-content: center;*/
    /*display: flex;*/
  }

  #land .list {
    display: flex;
    flex-direction: column;
  }
  #land .list.inner-rect {
    position: absolute;
    /*display: none;*/
    top: 5.555%;
    bottom: 5.555%;
    left: 5.555%;
    right: 5.555%;
  }

  #land .row {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  #land .col {
    position: relative;
    flex: 1;
  }
  #land .row .col:first-child {
    border-left: none;
  }
  #land .row:first-child .col {
    border-top: none;
  }
  #land .col:last-child {
    /*border-right: solid 2px #3385ff;*/
  }
  #land .row:last-child .col {
    /*border-bottom: solid 2px #3385ff;*/
  }

  #land .list.inner-rect .col {

  }
  #land .bg-wrap {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  #land .pic-wrap img {
    width: 100%;
  }
  #land .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
