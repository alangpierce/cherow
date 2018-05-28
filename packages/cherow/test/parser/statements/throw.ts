import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Throw', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Throws', () => {

      fail(`throw
      x;`, Context.Empty, {
          source: `throw
          x;`,
      });
  });

  describe('Pass', () => {

    pass(`throw\n1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `throw  12`,
      expected: {
        type: 'Program',
        start: 0,
        end: 9,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 9
          }
        },
        body: [
          {
            type: 'ThrowStatement',
            start: 0,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 9
              }
            },
            argument: {
              type: 'Literal',
              start: 7,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 9
                }
              },
              value: 12,
              raw: '12'
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`throw x * y`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `throw x * y`,
          expected: {
            type: 'Program',
            start: 0,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 11
              }
            },
            body: [
              {
                type: 'ThrowStatement',
                start: 0,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                },
                argument: {
                  type: 'BinaryExpression',
                  start: 6,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 6,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    },
                    name: 'x'
                  },
                  operator: '*',
                  right: {
                    type: 'Identifier',
                    start: 10,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    },
                    name: 'y'
                  }
                }
              }
            ],
            sourceType: 'script'
          }

      });

    pass(`throw {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `throw {}`,
        expected: {
            type: 'Program',
            start: 0,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            },
            body: [
              {
                type: 'ThrowStatement',
                start: 0,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                },
                argument: {
                  type: 'ObjectExpression',
                  start: 6,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  },
                  properties: []
                }
              }
            ],
            sourceType: 'script'
          }
    });
  });

});
