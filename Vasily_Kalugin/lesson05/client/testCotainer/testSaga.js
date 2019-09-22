import { TEST_TYPE_SAGA, TEST_TYPE_SAGA_FULFILLED, TEST_TYPE_SAGA_REJECTED } from './actionTypes';
import { put, takeEvery } from 'redux-saga/effects';

function* testSaga(action) {
    try {
        if (!Number.isNaN(action.payload)) {
            yield put({
                type: TEST_TYPE_SAGA_FULFILLED,
                payload: Math.round(Math.random() * action.payload),
            });
        } else {
            throw new Error('action.payload is NaN');
        }
    } catch (err) {
        yield put({
            type: TEST_TYPE_SAGA_REJECTED,
            payload: 1,
        });
    }
}

export default function* watchTestSaga() {
    yield takeEvery(TEST_TYPE_SAGA, testSaga);
}
