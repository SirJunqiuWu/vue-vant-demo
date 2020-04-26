<template>
    <page :has-header="showNav">
        <template slot="header">
            <NavBar :title="title" :show-left="true" />
        </template>
        <template slot="content">
            <van-field
                    v-model="infoText"
                    clearable
                    autosize
                    rows="1"
                    :input-align=" title === '手机号'? 'left' : 'right' "
                    :label="title"
                    :placeholder="placeholder"
                    :type="type"
                    @input="inputValueChanged"
            />
            <van-field
                    v-if=" title === '手机号' "
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <template slot="button">
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <van-button
                    class="saveBtn"
                    round
                    type="info"
                    :loading="loading"
                    loading-text="保存中..."
                    @click="saveBtnPressed"
            >
                保存
            </van-button>
        </template>
    </page>
</template>

<script>
    import {utils} from "../../utils/utils";
    import NavBar from "../../components/NavBar";
    export default {
        name: "InfoEditPage",
        components:{
            NavBar
        },
        props:{

        },
        data() {
            return {
                showNav:!utils.isWeChat(),
                navTitle:'',
                title:'',
                placeholder:'', // 输入框提示文本
                type:'text',
                infoText:'', // 输入框输入文本
                sms:'', // 验证码
                loading:false, // 是否保存中
            }
        },
        beforeMount() {

        },
        mounted() {
            const query = this.$route.query;
            console.log('传过来的参数:', query);
            this.title = query.title;
            this.navTitle = query.title ? `修改用户${query.title}` : '信息编辑';
            this.placeholder = query.identify;
            this.infoText = query.des;
            this.type = query.type;
        },
        created() {

        },
        methods:{
            /**
             * 文本框值发生变化
             */
            inputValueChanged() {
                window.console.log('当前输入的值:', this.infoText);
            },
            /**
             * 保存按钮点击
             */
            saveBtnPressed() {
                if (this.infoText.length === 0) {
                    this.$toast(this.placeholder);
                    return;
                }
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$toast.success('保存成功');
                    this.$router.back();
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/px2rem.less";
    .saveBtn {
        display: block;
        margin: 50px auto 0;
        width: 290px;
    }
</style>