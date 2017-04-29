import _ from 'lodash';
import { FETCH_POST } from '../actions/index';

export default function ( state = {}, action ) {
  switch (action.type) {
    case FETCH_POST:
      return _.lodash(action.payload.data, 'id');
  }
  return state;
}
