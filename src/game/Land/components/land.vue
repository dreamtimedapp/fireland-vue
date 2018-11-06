<template>
  <div id="land">
    <div class="land-list outer-rect" ref="outerList" :style="{height: outerListHeight}">
      <div class="land-row" v-for="(row, index) in outerList" :key="index" :style="{zIndex: (index*2 + 1)}">
        <div class="land-col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          {{col.price}}
        </div>
      </div>
    </div>

    <div class="land-list inner-rect" ref="innerList" >
      <div class="land-row" v-for="(row, index) in innerList" :key="index" :style="{zIndex: (index*2 + 2)}">
        <div class="land-col bg-wrap pic-wrap" v-for="col in row" :key="col.id" :style="col.style">
          {{col.price}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import landImg1 from '../../../assets/land/land-1.png';
import landImg1_m from '../../../assets/land/land-1-m.png';
import landImg1_b from '../../../assets/land/land-1-b.png';
import landImg1_b_m from '../../../assets/land/land-1-b-m.png';
import store from '../../../store'

import { setInterval } from 'timers';

const STATUS_ENUM = {
  nature: {
    color: '#ccc',
    bg: landImg1,
    bg_m: landImg1_m
  },
  rare: {
    color: '#000',
    bg: landImg1_b,
    bg_m: landImg1_b_m
  }
};
const outerList = [];
const innerList = [];

for (let i=0; i < 9; i++) {
  const row = [];
  for (let j=1; j < 10; j++) {
    const id = i*9 + j;
    const col = {
      id: id
    };

    col.type = 'nature';
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
    const id = (i*8 + j) + 81;
    const col = {
      id: id
    };

    col.type = 'nature';
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
  props: ['landInfo','account'],
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
      innerList: innerList,
      personal:[],
      landList:[],
      account_name:''
    }
  },
  methods: {
    initLand: (row, data,account_name)=> {
      row.map((col)=> {
        const colData = data[col.id];
        if (colData) {
          col.hasOwner = true;
          col.style.opacity = 1;
     
          col.price = colData.landID;

          if (colData.type === 0) {
            col.type = 'nature';
          } else if (colData.type === 1) {
            col.type = 'rare';
          }
          /* 更新土地属性 */
          col.style.backgroundImage = 'url(' + STATUS_ENUM[col.type].bg + ')';

          /* 需要读自己的name */
          if (colData.owner === account_name) {
            col.style.backgroundImage = 'url(' + STATUS_ENUM[col.type].bg_m + ')';
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
    if (this.account) {
       this.account_name = this.account.name
    }
    setInterval(()=> {
      const res = {
        "rows": this.landInfo.current_landlist,
        "more": false
      };
//      debugger

      const data = {};
      res.rows && res.rows.map(function(item){
        data[item.landID] = item;
      });

      _this.outerList.map((row)=> {
        _this.initLand(row, data,this.account_name);
      });

      _this.innerList.map((row)=> {
        _this.initLand(row, data,this.account_name);
      });

    }, 800);
  }
}
</script>

<style>

  #land {
    position: relative;
    margin: 0;
    padding: 0;
    margin-top: 30px;
    width: 730px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

   
    /*justify-content: center;*/
    /*display: flex;*/
  }

  #land .land-list {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    z-index: unset;
    background-color: #959dae;
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
    z-index: 1;
  }
  #land .land-col {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    margin: -10px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
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
