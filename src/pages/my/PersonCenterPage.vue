<template>
    <page :has-header="showNav">
        <template slot="header">
            <NavBar :show-left="true" title="个人中心" />
        </template>
        <template slot="content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-cell-group v-for="(arr, idx) in dataArray" :key="idx">
                    <van-cell
                            is-link
                            v-for="(item, index) in arr"
                            :title="item.title"
                            :value="item.des"
                            :key="index"
                    >
                        <template #right-icon v-if="item.icon && item.icon.length > 0">
                            <van-image
                                    round
                                    width="50"
                                    height="50"
                                    :src="item.icon"
                            />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-pull-refresh>
        </template>
    </page>
</template>

<script>
    import NavBar from "../../components/NavBar";
    import {utils} from "../../utils/utils";
    export default {
        name: "PersonCenterPage",
        components:{
            NavBar
        },
        props:{

        },
        data() {
            return {
                showNav:!utils.isWeChat(),
                isLoading:false,
                dataArray:[
                    [
                        {
                            title:'头像',
                            des:'',
                            icon:'https://img.yzcdn.cn/vant/cat.jpeg'
                        },
                        {
                            title: '昵称',
                            des:'Jack',
                            icon:''
                        }
                    ],
                    [
                        {
                            title: '性别',
                            des:'男',
                            icon:''
                        },
                        {
                            title: '生日',
                            des:'2020-01-01',
                            icon:''
                        },
                    ]
                ]
            }
        },
        beforeMount() {

        },
        created() {

        },
        methods:{
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                }, 2000)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/px2rem.less";
    .van-cell-group {
        margin-top: px2rem(10);
    }
    .van-cell {
        align-items: center;
    }
</style>