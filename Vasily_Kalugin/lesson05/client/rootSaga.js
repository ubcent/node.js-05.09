import { fork } from 'redux-saga/effects';
import toDoListSagas from '~/toDoList/sagas';

export default function* rootSaga() {
    yield fork(toDoListSagas);
}
