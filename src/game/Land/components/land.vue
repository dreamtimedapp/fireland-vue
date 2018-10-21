<template>
  <div id="land">
    <div class="land-list outer-rect" ref="outerList" :style="{height: outerListHeight}">
      <div class="land-row" v-for="(row, index) in outerList" :key="index">
        <div class="land-col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          {{col.price}}
        </div>
      </div>
    </div>

    <div class="land-list inner-rect" ref="innerList" >
      <div class="land-row" v-for="(row, index) in innerList" :key="index">
        <div class="land-col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          {{col.price}}
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
//      col.type = 'nature';
//    } else if (k === 2) {
//      col.type = 'private';
//    } else {
//      col.type = 'rare';
//    }

    col.type = 'nature';
    col.pic = STATUS_ENUM[col.type].pic;
    col.style = {
      backgroundImage: 'url(' + STATUS_ENUM[col.type].bg + ')',
      opacity: 0.5
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
//      col.type = 'nature';
//    } else if (k === 2) {
//      col.type = 'private';
//    } else {
//      col.type = 'rare';
//    }

    col.type = 'nature';
    col.pic = STATUS_ENUM[col.type].pic;
    col.style = {
      backgroundImage: 'url(' + STATUS_ENUM[col.type].bg + ')',
      opacity: 0.5
    };

    row.push(col);
  }
  innerList.push(row);
}
//console.log(outerList.map((o) => {
//  return o.map((item) => {
//    return item.id
//  })
//}));
//
//console.log(innerList.map((o) => {
//  return o.map((item) => {
//    return item.id
//  })
//}));

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
    initLand: function(row, data) {
      row.map(function(col) {
        const colData = data[col.id];
        if (colData) {
          col.hasOwner = true;
          col.style.opacity = 1;
          col.price = (colData.price/100).toFixed(1);
          if (colData.type === 0) {
            col.type = 'nature';
          } else if (colData.type === 1) {
            col.type = 'rare';
          }
        } else {
          col.hasOwner = false;
          col.style.opacity = 0.5;
        }
      });
    }
  },
  mounted: function() {
    const outerListWidth = this.$refs.outerList.clientWidth;
//    const outerListHeight = (outerListWidth/330*196);
    const outerListHeight = outerListWidth / 670 * 375;
    this.outerListHeight = outerListHeight + 'px';

//    const innerListWidth = outerListWidth * 8/9;
//    const innerListHeight = outerListHeight * 8/9;
//    this.innerListWidth = innerListWidth + 'px';
//    this.innerListHeight = innerListHeight + 'px';
//    this.innerListTop = outerListHeight / 18 + 'px';
//    this.innerListLeft = outerListWidth / 18 + 'px';

    var _this = this;
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

      const data = {};
      res.rows && res.rows.map(function(item){
        data[item.landID] = item;
      });

      _this.outerList.map(function(row) {
        _this.initLand(row, data);
      });

      _this.innerList.map(function(row) {
        _this.initLand(row, data);
      });

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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #12161b;;
    /*justify-content: center;*/
    /*display: flex;*/
  }

  #land .land-list {
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  #land .land-list.inner-rect {
    position: absolute;
    /*display: none;*/
    top: 5.555%;
    bottom: 5.555%;
    left: 5.555%;
    right: 5.555%;
  }

  #land .land-row {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  #land .land-col {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #land .land-row .land-col:first-child {
    border-left: none;
  }
  #land .land-row:first-child .land-col {
    border-top: none;
  }
  #land .land-col:last-child {
    /*border-right: solid 2px #3385ff;*/
  }
  #land .land-row:last-child .land-col {
    /*border-bottom: solid 2px #3385ff;*/
  }

  #land .land-list.inner-rect .land-col {

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
