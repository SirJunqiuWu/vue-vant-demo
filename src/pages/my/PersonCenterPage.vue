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
                            @click="cellClicked(item)"
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
                <van-action-sheet
                        v-model="showSelect"
                        close-on-popstate
                        close-on-click-action
                        :actions="actions"
                        cancel-text="取消"
                        cancel-color="#07c160"
                        :description="selectTitle"
                        @cancel="onCancel"
                        @select="onSelect"
                />
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
                showSelect:false,
                selectTitle:'选择性别',
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
                ],
                actions:[
                    {
                        name:'男',
                        color:'#07c160',
                        code:'0'
                    },
                    {
                        name:'女',
                        color:'#07c160',
                        code:'1'
                    }
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
            },
            cellClicked(item) {
                if (item.title === '性别') {
                    this.showSelect = true;
                }
            },
            onCancel() {
                this.showSelect = false;
            },
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.show = false;
                window.console.log('当前选择性别:', item.code)
                this.dataArray[1][0].des = item.name;
            },
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