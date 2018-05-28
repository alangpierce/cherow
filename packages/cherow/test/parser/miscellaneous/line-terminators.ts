import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Line terminators', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
  fail(`line feed within strings`, Context.Empty, {
      source: `"
      str
      ing
      ";`,
      line: 1
  });

  fail(`single line comment contains line feed`, Context.Empty, {
      source: `//single
      line comment`,
      line: 2
  });

  fail(`line terminator expressed as a Unicode escape sequence - \\u000Ax;`, Context.Empty, {
      source: `var\\u000Ax;`,
      line: 1
  });

  fail(`invalid paragraph separator`, Context.Empty, {
      source: `\\u2028var\\u2028x\\u2028=\\u2028y\\u2028/\\u2028z\\u2028; result = x;`,
      line: 1
  });

  fail(`line terminator expressed as a Unicode escape sequence - \\u000Ax;`, Context.Empty, {
      source: `var\\u000Ax;`,
      line: 1
  });
});

    describe('Pass', () => {

  pass(`line terminators between operators`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module | Context.Strict, {
    source: `var
    x
    =
    y
    -
    z
    ;`,
    expected: {
        type: 'Program',
        start: 0,
        end: 39,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 5
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 7,
                column: 5
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 8,
                end: 33,
                loc: {
                  start: {
                    line: 2,
                    column: 4
                  },
                  end: {
                    line: 6,
                    column: 5
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 8,
                  end: 9,
                  loc: {
                    start: {
                      line: 2,
                      column: 4
                    },
                    end: {
                      line: 2,
                      column: 5
                    }
                  },
                  name: 'x'
                },
                init: {
                  type: 'BinaryExpression',
                  start: 20,
                  end: 33,
                  loc: {
                    start: {
                      line: 4,
                      column: 4
                    },
                    end: {
                      line: 6,
                      column: 5
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 20,
                    end: 21,
                    loc: {
                      start: {
                        line: 4,
                        column: 4
                      },
                      end: {
                        line: 4,
                        column: 5
                      }
                    },
                    name: 'y'
                  },
                  operator: '-',
                  right: {
                    type: 'Identifier',
                    start: 32,
                    end: 33,
                    loc: {
                      start: {
                        line: 6,
                        column: 4
                      },
                      end: {
                        line: 6,
                        column: 5
                      }
                    },
                    name: 'z'
                  }
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'module'
      }
  });
});
});
