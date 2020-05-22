<template>
    <page :has-header="true">
        <template slot="header">
            <NavBar :show-left="showNav" title="数组遍历方法" />
        </template>
        <template slot="content">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-cell v-for="(item, index) in list" :key="index" :title="item.title" @click="cellClicked(item, index)" />
            </van-list>
        </template>
    </page>
</template>

<script>
    import NavBar from "../../components/NavBar";
    import {utils} from "../../utils/utils";
    import index from "../../store";
    export default {
        name: "TestArray",
        components:{
            NavBar,
        },
        props:{

        },
        data() {
            return {
                showNav:!utils.isWeChat(),
                list:[
                    {title:'for循环', count:0},
                    {title:'forEach循环', count:2},
                    {title:'map循环 可返回新数组 不改变原始数组', count:4},
                    {title:'forOf遍历', count:6},
                    {title:'filter遍历 可返回新数组 不改变原始数组', count:8},
                    {title:'every遍历 数组中的元素都符合某个条件', count:10},
                    {title:'some遍历 数组中的任意元素符合某个条件', count:12},
                    ],
                loading:false,
                finished:false,
            }
        },
        mounted() {

        },
        created() {

        },
        methods:{
            cellClicked(item, idx) {
                if (idx === 0) {
                    this.testFor();
                } else if (idx === 1) {
                    this.testForeach();
                } else if (idx === 2) {
                    this.testMap();
                } else if (idx === 3) {
                    this.testForOf();
                } else if (idx === 4) {
                    this.testFilter();
                } else if (idx === 5) {
                    this.testEvery();
                } else if (idx === 6) {
                    this.testSome();
                }
            },
            /**
             * for循环
             */
            testFor() {
                // 使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。
                for(let i = 0, len = this.list.length; i < len; i++) {
                    window.console.log(this.list[i].title);
                }
            },
            /**
             * forEach循环
             */
            testForeach() {
                // 遍历数组中的每一项，没有返回值，对原数组没有影响，不支持IE
                // 参数：item数组中的当前项, index当前项的索引, array原始数组；                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              c
                // 数组中有几项，那么传递进去的匿名回调函数就需要执行几次；
                const arr = [];
                this.list.forEach((item, index, array) => {
                    //执行代码 可做处理
                    // window.console.log('forEach:', 'item:', item, 'index:', index, 'array:', array);
                    if (item.count < 6) arr.push(item.count);
                });
                window.console.log('forEach:', arr);
            },
            /**
             * map循环 可以方便快速拿到数组中符合某一条件的项
             * 有返回值，可以return出来
             * map的回调函数中支持return返回值,注意:return的是啥，相当于把克隆数组中的这一项变为啥
             * 并不影响原来的数组，只是相当于把原数组克隆一份，但并不克隆数组元素，只是相当于重新new了一个元素个数相同的数组，元素为undefine，
             * retuern可以把克隆的这一份的数组中的对应项改变了；
             */
            testMap() {
                let res = this.list.map(function (item, index, array) {
                    return item.count < 6;
                });
                console.log('map arr:', res);
                console.log('map list:', this.list);
            },
            /**
             * 可以正确响应break、continue和return语句
             * value为数组当前项 可以改变当前项的内容
             * 在不需要索引的情况下非常实用
             */
            testForOf() {
                let arr = this.list;
                for (let value of arr) {
                    if (value.count > 6)
                        value.count *= 10;
                }
                console.log('forOf list:', this.list);
            },
            /**
             * 不会改变原始数组,返回新数组
             * 将符合条件的选项删选出来
             */
            testFilter() {
                let arr = this.list;
                let res = arr.filter(function (item) {
                    return item.count >= 80;
                });
                console.log('filter arr:', res);
                console.log('filter list:', this.list);
            },
            /**
             * 有返回值 true 或者 false
             * every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true,则返回true。(所有项满足)
             * 即有一项不满足条件则为false
             */
            testEvery() {
                let arr = this.list;
                let res = (arr.every(function(item, index, array ){
                    return item.count > 0;
                }));
                console.log('every:', res);
                console.log('every list:', this.list);
            },
            /**
             * 有返回值 true 或者 false
             * some()是对数组中的每一项运行给定函数，如果该函数对任一项返回true,则返回true。(某一项满足)
             * 即有一项不满足条件则为false
             */
            testSome() {
                let arr = this.list;
                let res = (arr.some(function(item, index, array ){
                    return item.count > 10;
                }));
                console.log('some:', res);
                console.log('some list:', this.list);
            },
            onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                setTimeout(() => {
                    this.finished = true;
                }, 500)
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/px2rem.less";
</style>