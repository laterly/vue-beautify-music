<template>
    <div class="search main">
        <form action="/">
        <van-search
            autofocus="autofocus"
            v-model="sarchValue"
            placeholder="你想听什么?"
            show-action
            @search="onSearch"
            @cancel="onCancel"
        />
        </form>
        <div class="search-recommend" v-show="!totalPage">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="大家都在搜" name="1">
              <ul class="recommend-btn flex-row">
                <li class="flex-center" v-for="(item,index) in hotKeyArr" :key="index" @click="onSearch(item.keyword)">{{item.keyword}}</li>
              </ul>
            </van-collapse-item>
            <van-collapse-item title="搜索历史" name="2">
               <ul class="recommend-btn flex-row">
                <li class="flex-center" v-for="(item,index) in historyKeyArr" :key="index" @click="onSearch(item.keyword)">{{item.keyword}}</li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div v-show="totalPage">
        <song-list :list="listData"></song-list>
        </div>
    </div>
</template>
<script>
import store from "@/utils/common/store";
import songList from '@/components/Moudle/songList/songList'
export default {
   components: {
      songList
  },
  mounted() {},
  data() {
    return {
      sarchValue: "", //搜索的关键字
      activeNames:['1'],
      key:'',
      hotKeyArr:[],
      historyKeyArr:[],
      page:0,
      listData:[],
      isShowList:false,
      totalPage:0
    };
  },
  created() {
    this.getHotKey();
  },
  mounted() {},
  methods: {
    getHotKey(){
      let load = this.$loading();
      this.$http.getHotSearch().then((res) => {
        load.clear();
        this.hotKeyArr = res.data.data.info;
      })
      this.historyKeyArr=store.local.get('historyKeyArr')?store.local.get('historyKeyArr'):[];
    },
    onSearch(keyWord) {
      let key='';
      if(!keyWord)
        key=this.sarchValue;
      else
        key=keyWord;
      if(!key)
        this.$toast('搜索关键字不能为空！');
      this.key=key;
      let historyKeyArr=store.local.get('historyKeyArr')?store.local.get('historyKeyArr'):[];
      let allKeyWord=[];
      for(let item of historyKeyArr){
        allKeyWord.push(item.keyword);
      }
      if(!allKeyWord.includes(this.key)){
        let obj={
          keyword:this.key
        }
        historyKeyArr.push(obj);
        store.local.set('historyKeyArr',historyKeyArr)
        this.historyKeyArr=historyKeyArr;
      }
      this.getSearchData();
    },
    getSearchData(){
      let load = this.$loading();
      this.$http.getSongSearch({
          format: 'json',
          keyword: this.key,
          page: this.page,
          pagesize: 20
        }).then((res) => {
          load.clear();
          this.totalSongs = res.data.data.total
          this.totalPage = Math.ceil(res.data.data.total / 20)
          this.listData=res.data.data.info;
        })
    },
    onCancel() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="stylus" scoped>
.search{

}
.search-recommend {
  .van-collapse-item__content{
  }
  .recommend-btn{
    li{
      padding 4px 10px 4px 10px;
      background-color rgb(242, 242, 242);
      border-radius 4px;
      margin-right:.4rem;
      color:rgba(0,0,0,.7);
      margin-top .1rem;
    }
  }
}
</style>