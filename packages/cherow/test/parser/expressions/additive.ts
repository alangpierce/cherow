import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Object literal', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    pass('--a', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '--a',
        expected: {
            type: 'Program',
            start: 0,
            end: 3,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 3
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                expression: {
                  type: 'UpdateExpression',
                  start: 0,
                  end: 3,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 3
                    }
                  },
                  operator: '--',
                  prefix: true,
                  argument: {
                    type: 'Identifier',
                    start: 2,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    name: 'a'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });
});
