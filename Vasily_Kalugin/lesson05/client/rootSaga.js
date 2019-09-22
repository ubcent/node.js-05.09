import { fork } from 'redux-saga/effects';
import watchTestSaga from './testCotainer/testSaga';

export default function* rootSaga() {
    yield fork(watchTestSaga);
}
