import { TEST_TYPE, TEST_TYPE_SAGA } from './actionTypes';

export function testAction(testData) {
    return {
        type: TEST_TYPE,
        payload: testData,
    };
}

export function testSagaAction() {
    return {
        type: TEST_TYPE_SAGA,
        payload: 10,
    };
}
