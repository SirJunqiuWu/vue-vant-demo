import * as types from './types';

const Getters = {
    [types.Type_Project_Menu]: state => state[types.Type_Project_Menu],
    [types.Type_Project_Project_Service]: state => state[types.Type_Project_Project_Service]
};

export default Getters;
