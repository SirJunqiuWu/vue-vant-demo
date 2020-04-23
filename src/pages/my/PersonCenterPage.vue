<template>
    <page :has-header="showNav">
        <template slot="header">
            <NavBar :show-left="true" />
        </template>
        <template slot="content">
            <p>个人中心</p>
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
            }
        },
        beforeMount() {

        },
        created() {

        },
        methods() {

        }
    }
</script>

<style scoped>

</style>