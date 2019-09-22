import { TEST_TYPE, TEST_TYPE_SAGA_FULFILLED, TEST_TYPE_SAGA_REJECTED } from './actionTypes';

const initState = {
    testData: false,
    testSagaData: 0,
};

const reducersTestApp = (state = initState, { type, payload }) => {
    switch (type) {
        case TEST_TYPE:
            return {
                ...state,
                testData: payload,
            };
        case TEST_TYPE_SAGA_FULFILLED:
            return {
                ...state,
                testSagaData: payload,
            };
        case TEST_TYPE_SAGA_REJECTED:
            return {
                ...state,
                testSagaData: payload,
            };
        default:
            return state;
    }
};

export default reducersTestApp;
