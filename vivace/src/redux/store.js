import {createStore} from 'redux';
import reducer from './reducers/index';

export default (initialState = {}) => {
    const store = createStore(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module reload for reducers
        module.hot.accept('../redux/reducers', () => {
            const nextReducer = require('../redux/reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
};
