<template>
    <page :has-header="showNav">
        <template slot="header">
            <NavBar title="系统设置" :show-left="true" />
        </template>
        <template slot="content">
            <van-cell-group>
                <van-cell title="余额免密支付">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-switch v-model="checked" @change="switchChange()" />
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell
                        is-link
                        v-for="(item, index) in dataArray"
                        :key="index"
                        :title="item.title"
                        :value="item.value"
                        @click="cellClicked(index, item)"
                />
            </van-cell-group>

            <van-button round type="info" @click="logout">退出登录</van-button>
        </template>
    </page>
</template>

<script>
    import {utils} from "../../utils/utils";
    import NavBar from "../../components/NavBar";
    export default {
        name: "SystemSettingPage",
        components:{
            NavBar
        },
        props:{

        },
        data() {
            return {
               showNav:!utils.isWeChat(),
               checked:false,
               dataArray:[
                   {
                       title:'当前版本',
                       value:'1.0.0',
                       clickUrl:''
                   },
                   {
                       title:'隐私政策和服务条款',
                       value:'',
                       clickUrl:''
                   }
               ]
            }
        },
        mounted() {

        },
        methods:{
            switchChange() {
                if (this.checked) {
                    this.$toast.success('开启成功');
                } else {
                    this.$toast.success('关闭成功');
                }
            },
            cellClicked(index, item) {
                if (item.title === '当前版本') {
                    this.$toast('已经是最新版本');
                } else {
                    this.$router.push({
                        path:'web',
                        query:{
                            title:'隐私政策',
                            src:'http://www.baidu.com'
                        }
                    });
                }
            },

            logout() {
                this.$dialog.confirm({
                    message: '确定退出登录吗？'
                }).then(() => {
                    window.console.log('确定');
                    this.$router.push('login')
                }).catch(() => {
                    window.console.log('取消');
                });
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/px2rem.less";
    .van-cell-group {
        margin-bottom: px2rem(8);
    }

    .van-button {
        display: block;
        margin: px2rem(50) auto 0;
        width: px2rem(290);
        height: px2rem(40);
        line-height: px2rem(40);
    }
</style>