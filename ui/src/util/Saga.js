// @flow
import get from 'lodash/get';
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import {
  call, put, spawn, select,
} from 'redux-saga/effects';

/**
 * Executing calls sequential.
 *
 * This is a counterpart to `all` which executes calls in parallel.
 *
 * @param calls The calls to execute.
 * @returns A generator.
 * @see https://stackoverflow.com/a/45377797/2153190
 */
export function* sequence(calls: Array<*>): Generator<*, *, *> {
  // eslint-disable-next-line no-restricted-syntax
  for (const c of calls) {
    yield c;
  }
}

/**
 * Returns an instantiable saga regarding if only a generator function was given or if already an
 * instantiable saga in the form [saga, params...] was given.
 *
 * @param saga The saga as generator function or in the form [saga, params...].
 * @return An array containing the saga as first value and additional parameters as following values.
 * @throws TypeError if an unexpected saga type was given.
 */
export const refineSaga = (saga: * | Array<*>): Array<*> => {
  // Saga is a generator function without params
  if (typeof saga === 'function') {
    return [saga];
  }

  // Ensures that a saga in the form [saga, params...] was given
  if (Array.isArray(saga) && typeof saga[0] === 'function') {
    return saga;
  }

  throw TypeError(`Unexpected saga type: ${saga.toString()}`);
};

/**
 * Combines multiple sagas into an array.
 *
 * We use spawn to detach parallel sagas, so that a failing saga doesn't kill all other sagas.
 *
 * https://github.com/redux-saga/redux-saga/issues/395
 * http://stackoverflow.com/questions/39438005/what-is-the-idiomatic-way-of-starting-rootsaga
 *
 * @param sagas The sagas to combine.
 */
export const combineSagas = (sagas: any[]): any[] => sagas.map(saga => spawn(...refineSaga(saga)));
