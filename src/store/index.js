import Vue from "vue";
import * as Vuex from "vuex";
import * as types from './types';
import actions from '@/store/actions';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

Vue.use(Vuex);
const state = {
    [types.Type_Project_Menu]: {
        info: {},
        menuList: [],
        definitions: [],
    },
    [types.Type_Project_Project_Service]: {
        list:[]
    },
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
