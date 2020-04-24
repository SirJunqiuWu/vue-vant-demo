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
                <div class="bank-bk"></div>
                <!-- dataPicker -->
                <van-popup v-model="showDatePicker" position="bottom" round close-on-popstate>
                    <van-datetime-picker
                            v-model="currentDate"
                            type="date"
                            title="选择生日"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :formatter="formatter"
                            @confirm="confirmDateSelect"
                            @cancel="cancelDateSelect"
                    />
                </van-popup>
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
                        },
                        {
                            title: '手机号',
                            des:'18321567392',
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
                    ],
                    [
                        {
                            title: '兴趣爱好',
                            des:'跑步跳舞唱歌',
                            icon:''
                        },
                    ]
                ],
                /**
                 * 性别选择: actionSheect
                 */
                showSelect:false,
                selectTitle:'选择性别',
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
                ],
                /**
                 * 日期选择: dataPicker
                 */
                showDatePicker:false,
                minDate: new Date(1920, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
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
                } else if (item.title === '生日') {
                    this.showDatePicker = true;
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
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                } else
                    return `${val}日`;
            },
            confirmDateSelect(value) {
                this.cancelDateSelect();
                const date = new Date(value);
                window.console.log('当前选择时间:', utils.getDateByTimestampAndFormatter(date, 'yyyy-MM-dd'));
                this.dataArray[1][1].des = utils.getDateByTimestampAndFormatter(date, 'yyyy-MM-dd');
            },
            cancelDateSelect() {
                this.showDatePicker = false;
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
    .bank-bk {
        height: px2rem(200);
    }
</style>