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
                            :key="index"
                            @click="cellClicked(item)"
                    >
                        <!-- 使用插槽自定义cell右侧 -->
                        <template #right-icon v-if="item.icon && item.icon.length > 0">
                            <van-image
                                    round
                                    width="50"
                                    height="50"
                                    :src="item.icon"
                            />
                        </template>
                        <template #default v-else>
                            <p :class=" item.des && item.des.length > 0 ? 'cell-right-has-edit' : 'cell-right-no-edit' ">{{formatterValue(item)}}</p>
                        </template>
                    </van-cell>
                </van-cell-group>
                <!-- 空白占位 -->
                <div class="bank-bk" />
            </van-pull-refresh>
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
        </template>
    </page>
</template>

<script>
    import NavBar from "../../components/NavBar";
    import {utils} from "../../utils/utils";
    import {getCurrentUser, updateUserInfoByKey} from '../my/Model/User';
    import { getTitleSubTitleObj } from "../../Model/WJQTitleSubTitle";

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
                dataArray:[],
                /**
                 * 性别选择: actionSheect
                 */
                showSelect:false,
                selectTitle:'选择性别',
                actions:[],
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
        mounted() {
            const currentUser = getCurrentUser();
            // 更新列表数据源
            this.updateDataArray(currentUser);
            // 更新actions
            this.updateActions();
            // 更新日历默认值
            this.currentDate = new Date(currentUser && currentUser.birth);
        },
        created() {

        },
        methods:{
            formatterValue(item) {
                if (item.title === '头像') return '';
                return item.des && item.des.length > 0  ? item.des : '完善信息'
            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                }, 2000)
            },
            cellClicked(item) {
                if (item.title === '性别') {
                    this.showSelect = true;
                    return;
                }
                if (item.title === '生日') {
                    this.showDatePicker = true;
                    return;
                }
                if (item.title !== '头像') {
                    this.$router.push({
                        path:'info-edit',
                        query:item
                    })
                }
            },
            onCancel() {
                this.showSelect = false;
            },
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.show = false;
                window.console.log('当前选择性别:', item.name)
                this.dataArray[1][0].des = item.name;
                // 更新User性别
                updateUserInfoByKey('sex', item.name);
                // 更新actions
                this.updateActions();
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
                const birth = utils.getDateByTimestampAndFormatter(date, 'yyyy-MM-dd');
                this.dataArray[1][1].des = birth;
                this.currentDate = date;
                updateUserInfoByKey('birth', birth);
            },
            cancelDateSelect() {
                this.showDatePicker = false;
            },
            updateDataArray() {
                const currentUser = getCurrentUser();
                const item00 = getTitleSubTitleObj('头像', '', '请上传头像', 'avatar', currentUser.userAvatar, '');
                const item01 = getTitleSubTitleObj('昵称', currentUser.nickName, '请输入昵称', 'nickName', '', 'text');
                const item02 = getTitleSubTitleObj('手机号', currentUser.mobile, '请输入手机号', 'mobile', '', 'tel');

                const item10 = getTitleSubTitleObj('性别', currentUser.sex, '请选择性别', 'sex', '', '');
                const item11 = getTitleSubTitleObj('生日', currentUser.birth, '请选择生日', 'birth', '', '');
                const item12 = getTitleSubTitleObj('兴趣爱好', currentUser.interest, '请输入兴趣爱好', 'interest', '', 'textarea');
                this.dataArray = [[item00, item01, item02], [item10, item11, item12]];
            },
            updateActions() {
                const sex = this.dataArray[1][0].des;
                let colorForBoy = '#323232';
                let colorForGirl = '#323232';
                if (sex === '男') {
                    colorForBoy = '#07c160';
                }
                if (sex === '女') {
                    colorForGirl = '#07c160';
                }
                this.actions = [
                    {
                        name:'男',
                        color: colorForBoy,
                        code:'0'
                    },
                    {
                        name:'女',
                        color: colorForGirl,
                        code:'1'
                    }
                ];
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
    .cell-right-has-edit {
        color: #969799;
    }
    .cell-right-no-edit {
        color: #07c160;
    }
</style>