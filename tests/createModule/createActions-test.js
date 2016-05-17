import { expect, should } from 'chai';
import createActions from '../../src/createModule/createActions';
should();
const mockTransforms = [
  { formattedConstant: 'mock/MOCK_ONE', action: 'MOCK_ONE' },
  { formattedConstant: 'mock/MOCK_ONE', action: 'MOCK_TWO' },
  {
    formattedConstant: 'mock/MOCK_THREE',
    action: 'MOCK_THREE',
    meta: {
      foo: 'bar',
    },
  },
];

describe('createActions', () => {
  const generatedActions = createActions(mockTransforms);
  const keys = Object.keys(generatedActions)
  const firstKey = keys[0];
  const lastKey = keys.slice(-1);

  describe('generated hash', () => {
    it('should return a hash', () => {
      (typeof generatedActions === 'object').should.equal(true);
    });
    it('contain keys that are camelcased', () => {
      firstKey.should.equal('mockOne');
    });
    it('generates the same number of actions as transformations', () => {
      const numberOfActions = Object.keys(generatedActions).length;
      numberOfActions.should.equal(mockTransforms.length);
    });
  });

  describe('generated action', () => {
    const actionToTest = generatedActions[firstKey];
    const actionWithMeta = generatedActions[lastKey];
    const result = actionToTest({foo: 'bar'});
    const resultWithMeta = actionWithMeta({foo: 'bar'});

    it('should contain a type key whose value is a well formatted action constant', () => {
      result.type.should.equal('mock/MOCK_ONE');
    });

    it('should handle object payloads', () => {
      result.payload.should.deep.equal({foo: 'bar'});
    });

    it('should handle null payloads', () => {
      const nullTest = actionToTest(null);
      expect(nullTest.payload).to.equal(null);
    });

    it('should handle empty payloads', () => {
      const nullTest = actionToTest();
      expect(nullTest.payload).to.not.exist;
    });

    it('should handle numeric payloads', () => {
      const numberTest = actionToTest(5);
      expect(numberTest.payload).to.equal(5);
    });

    it('should not contain a meta key if not specified', () => {
      expect(result.meta).to.not.exist;
    });

    it('should contain a meta key if specified', () => {
      resultWithMeta.meta.should.deep.equal({foo: 'bar'});
    });
  });
});
