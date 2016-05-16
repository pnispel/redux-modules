import { createAction } from 'redux-actions';
import { reduce } from 'ramda';
import camelize from 'camel-case';
import propchecker from './propchecker';

const onError = msg =>
  err => {
    console.error(
      `Warning: Failed ${msg}:`,
      err
    );
  }

const payloadPipeline = (...args) => {
  return payload => {
    propchecker({
      onError: onError('payloadType'),
      ...args,
    })(payload);

    return payload;
  };
}

const metaPipeline = ({propTypes, ...args}) => {
  if (!propTypes) return;

  console.log(propTypes);

  return payload => {
    propchecker({
      onError: onError('metaType'),
      propTypes,
      ...args,
    })(payload.meta);

    return payload.meta;
  };
}

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    metaTypes,
    formattedConstant: actionName,
  } = transformation;
  const camelizedActionName = camelize(action);

  generatedActions[camelizedActionName] = createAction(
    actionName,
    payloadPipeline({actionName, propTypes: payloadTypes}),
    metaPipeline({actionName, propTypes: metaTypes})
  );

  return generatedActions;
};

export const createActions = transformations => {
  return reduce(_generateActions, {}, transformations);
};


export default createActions;
