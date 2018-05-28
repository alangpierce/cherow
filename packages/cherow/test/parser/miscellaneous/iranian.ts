import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - Iranian', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {});

    describe('Pass', () => {

        pass('دیوانه , دیوانه = 123;', Context.Empty, {
            source: 'دیوانه , دیوانه = 123;',
            expected: {
                  body: [
                    {
                      expression: {
                        expressions: [
                          {
                            name: 'دیوانه',
                            type: 'Identifier',
                          },
                          {
                            left: {
                              name: 'دیوانه',
                              type: 'Identifier',
                            },
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 123,
                            },
                            type: 'AssignmentExpression',
                          },
                        ],
                        type: 'SequenceExpression',
                      },
                      type: 'ExpressionStatement',
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass('class دیوانه { /* icefapper */ }', Context.Empty, {
            source: 'class دیوانه { /* icefapper */ }',
            expected: {
                  body: [
                    {
                      body: {
                        body: [],
                        type: 'ClassBody'
                      },
                      id: {
                        name: 'دیوانه',
                        type: 'Identifier',
                      },
                      superClass: null,
                      type: 'ClassDeclaration'
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

    });
});
