<template>
  <div class="page">
    <div class="header" id="header" :style="headerStyle">
      <slot name="header" v-if="hasHeader"></slot>
    </div>
    <div class="footer" :style="footerStyle">
      <slot name="footer" v-if="hasFooter"></slot>
    </div>
    <div class="content" id="content" :style="contentStyle">
      <slot name="content"></slot>
    </div>
  </div>

</template>

<script>
    // 这两个值如何设置更精确？？？
    const defaultHeaderHeight = 44;
    const defaultFooterHeight = 49;
    export default {
        name: "Page",
        props: {
            // 头部高度
            headerHeight: {
                type: Number,
                required: false,
                default: defaultHeaderHeight,
                validator: (value) => {
                    return true;
                }
            },
            // 底部高度
            footerHeight: {
                type: Number,
                required: false,
                default: defaultFooterHeight,
                validator: (value) => {
                    return true;
                }
            },
            // 是否有头部
            hasHeader: {
                type: Boolean,
                required: false,
                default: false,
                validator: (value) => {
                    return true;
                }
            },
            // 是否有底部
            hasFooter: {
                type: Boolean,
                required: false,
                default: false,
                validator: (value) => {
                    return true;
                }
            },
            // 是否固定内容区
            fixedContent: {
                type: Boolean,
                required: false,
                default: false,
                validator: (value) => {
                    return true;
                }
            }
        },
        provide() {
            return {
                contentMinHeight: this.contentStyle["min-height"]
            }
        },
        data() {
            return {
              windowHeight: window.innerHeight,
              windowWidth:window.innerWidth,
            }
        },
        created() {
            window.onresize = () => {
                this.windowHeight = window.innerHeight;
                this.windowWidth = window.innerWidth;
            };
        },
        methods: {
            //计算px2rem的值
            getPx2remVal(pxValue) {
                return `${pxValue / 40}rem`;
            },
            updatePageConfigHeaderHeight($headerHeight){
                // this.$pageConfig.$headerHeight = $headerHeight;
            },
            updatePageConfigContentHeight($contentHeight){
              // window.console.log('this.$pageConfig:', this.$pageConfig);
              //   this.$pageConfig.$contentHeight = $contentHeight;
            },
            updatePageContentWidth() {
              // ('#content').css('width', this.windowWidth);
            },
            updatePageConfigFooterHeight($footerHeight){
                // this.$pageConfig.$footerHeight = $footerHeight;
            }
        },
        computed: {
          /**
           * 设置头部样式
           * @returns {{height: *}}
           */
            headerStyle: function () {
                const height = this.hasHeader ? this.getPx2remVal(this.headerHeight) : 0;
                // console.log(this);
                this.updatePageConfigHeaderHeight(height);
                // this.$eventsCenter()
                return {
                    height: height
                }
            },
          /**
           * 设置内容区样式
           * @returns {{width: *, "padding-bottom": *, "margin-top": *, "min-height": *, height: *}}
           */
            contentStyle: function () {
                // console.log('contentStyle')
                const realHeaderHeight = this.hasHeader ? this.getPx2remVal(this.headerHeight) : '0rem';
                const realFooterHeight = this.hasFooter ? this.getPx2remVal(this.footerHeight) : '0rem';
                // const realContentMinHeight = `calc(${this.getPx2remVal(this.windowHeight)}${' - '}${realHeaderHeight})`;
                const realContentMinHeight = `calc(${this.windowHeight + 'px'}${' - '}${realHeaderHeight})`;
                const realContentHeight = this.fixedContent ? realContentMinHeight : 'unset';
                const realContentWidth = this.windowWidth;
                // console.log(realContentMinHeight);
                this.updatePageConfigContentHeight(realContentMinHeight);
                this.updatePageContentWidth();
                return {
                    'margin-top': realHeaderHeight,
                    'padding-bottom': realFooterHeight,
                    'height': realContentHeight,
                    'width': realContentWidth,
                    'min-height': realContentMinHeight
                }
            },
            footerStyle: function () {
                const height = this.hasFooter ? this.getPx2remVal(this.footerHeight) : 0;
                this.updatePageConfigFooterHeight(height);
                return {
                    height: height
                }
            }
        },
        watch: {
            hasHeader: function (value) {
            },
            headerHeight: function (value) {
            },
            hasFooter: function (value) {
            },
            footerHeight: function (value) {
            },
        }
    }
</script>

<style lang="less">
  @import "../../styles/px2rem.less";
  body {
    padding-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }

  /*iphoneX*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .van-tabbar--fixed{
      padding-bottom: 5px !important;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  /*iphoneX Max*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .van-tabbar--fixed{
      padding-bottom: 5px !important;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }


  .page {
    width: 100%;
  }

  .page {
    .header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 10;
      /*height: px2rem(50);*/
      background: white;
      /*overflow: hidden;*/
      /*box-shadow: 0 px2rem(1) px2rem(2) rgba(85, 85, 85, 0.65);*/
    }

    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 10;
      background: white;
      box-shadow: 0 px2rem(1) px2rem(2) rgba(85, 85, 85, 0.65);
      -webkit-transition: height 0.3s ease-in-out;
      transition: height 0.3s ease-in-out;
      /*overflow: hidden;*/
    }

    .content {
      position: relative;
      margin: 0;
      width: 100%;
      background: #FBFBFC;
    }

    /*.header ~ .content {*/
    /*margin-top: px2rem(49);*/
    /*}*/

    /*.footer ~ .content {*/
    /*padding-bottom: px2rem(49);*/
    /*}*/

    * {
      box-sizing: border-box;
    }
  }

</style>
