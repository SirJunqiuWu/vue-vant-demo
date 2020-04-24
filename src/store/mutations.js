import * as types from './types';

const Mutations = {

    [types.Type_Project_Menu]: (state, menu) => {


    },
    [types.Type_Project_Project_Service]: (state, result) => state[types.Type_Project_Project_Service] = {
        list:result
    },

};

export default Mutations;
