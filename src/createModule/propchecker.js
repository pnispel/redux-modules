import { curry, keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => { return {}; };

export const propCheckedCreator = ({actionName, propTypes, onError}) =>
  payload => {
    const _propCheck = type => {
      const propChecker = propTypes[type] || defaultPropCheck;
      const typeError = propChecker(payload, type, actionName, 'prop') || {};
      const { message } = typeError;

      message && onError(message);
    }

    compose(
      forEach(_propCheck),
      keys
    )(propTypes);
  }

export default propCheckedCreator;
