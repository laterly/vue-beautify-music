<template>
    <div class="menu">
    <van-nav-bar title="音乐歌单" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="search" slot="right"/>
    </van-nav-bar>
    <div class="swiper-big-box clearfix">
    <van-list v-model="loading" :finished="finished"  @load="onLoad">
      <div class="swiper-box">
        <div class="recommend">
            <div class="recommend-ul clearfix">
              <div class="recommend-li rel" v-for="(item, index) in songData" :key="index" @click="openMenu(item.specialid)">
                <div class="recommend-box rel">
                  <img v-lazy="item.imgUrl" />
                  <div class="recommend-desc abs"><van-icon name="audio" /><span>{{item.playCount}}</span></div>
                </div>
                <div class="text">{{item.specialName}}</div>
              </div>
            </div>
        </div>
      </div>
      </van-list>
    </div>
    </div>
</template>
<script>
import store from "@/utils/common/store";
import numberUnit from "@/utils/common/number";
import { mapState } from "vuex";
export default {
  mounted() {},
  data() {
    return {
      songData: [],
      page: 0,
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapState({
      koGouSize: state => state.koGouSize
    })
  },
  created() {
    // this.getSong();
  },
  mounted() {},
  methods: {
    onLoad() {
        // 异步更新数据
        this.page++;
        this.getSong(this.page); //获取商品列表
    },
    getSong(page) {
      let load = this.$loading();
      this.$http
        .getSongMenu({
          page: page
        })
        .then(res => {
          load.clear();
          let data = res.data.plist.list.info;
          if (data.length == 0) {
              this.finished = true;
              this.loading=false;
              this.isNodata=true;
            } else {
              this.loading = false;
            }

          for (let i = 0; i < data.length; i++) {
            this.songData.push({
              suid: data[i].suid,
              imgUrl: data[i].imgurl.replace(
                "{size}",
                this.$store.state.koGouSize
              ),
              playCount: numberUnit.convert(data[i].playcount),
              specialName: data[i].specialname,
              specialid: data[i].specialid
            });
          }
        });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {
      this.$router.push({ path: "/search" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.menu {
    .van-nav-bar {
        .van-icon {
            color: #23e379;
        }
    }

    .van-nav-bar__text {
        color: #23e379;
    }
}

.swiper-big-box {
    margin-bottom: 1.8rem;

    .title {
        font-size: 0.52rem;
        padding-top: 0.4rem;
        font-weight: bold;
        text-indent: 0.48rem;
    }

    .recommend {
        height: auto;

        .recommend-ul {
            width: 100%;
            padding-top: 0.28rem;
            padding-left: 0.48rem;

            .swiper-slide:last-child {
                padding-right: 0.48rem;
            }

            .recommend-li:after {
                content: '';
                position: absolute;
                width: 2.8rem;
                height: 2.8rem;
                margin-right: 0.48rem;
                border: 1px #23e379 solid;
                transform: rotate(5deg);
                border-radius: 4px;
                background: rgba(#23e379, 0.2);
                transform-origin: right bottom;
                left: -3px;
                top: -1px;
            }

            .recommend-li {
                height: auto;
                width: 2.78rem;
                margin-top: 0.48rem;
                float: left;
                margin-right: 0.62rem;

                .recommend-box {
                    z-index: 2;
                    width: 2.78rem;
                    height: 2.78rem;
                    border-radius: 4px;

                    img {
                        width: 2.78rem;
                        height: 100%;
                        border-radius: 4px;
                    }

                    .recommend-desc {
                        color: #fff;
                        width: 100%;
                        height: 100%;
                        line-height: 4.8rem;
                        vertical: middle;
                        bottom: 0;
                        border-radius: 3px;
                        font-size: 12px;
                        left: 0;
                        text-indent: 0.06rem;

                        span {
                            display: inline-block;
                            height: 50px;
                            line-height: 50px;
                            padding-bottom: 5px;
                        }
                    }
                }

                .text {
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    box-orient: vertical;
                    display: -webkit-box;
                    display: box;
                    font-size: 14px;
                    color: #333;
                    height: 1.1rem;
                    padding-top: 0.1rem;
                    line-height: 0.55rem;
                }
            }

            .recommend-li:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
}
</style>