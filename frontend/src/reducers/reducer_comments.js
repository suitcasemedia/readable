import _ from 'lodash';
import {
    CREATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    LOAD_POST_COMMENTS
    
} from '../actions' ;

const initialCommentsState = {}
export default function (state= initialCommentsState , action){
    switch (action.type){ 
        case DELETE_COMMENT:
            return _.omit(state.comments, action.payload);
        case LOAD_POST_COMMENTS:
            if(action.payload.data){
               return  _.mapKeys(action.payload.data,'id')
               
              //  return {...state , comments}
            }
        case CREATE_COMMENT:    
            return{...state}
         default:
            return state
    }

}

