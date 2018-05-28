import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - Shebang', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('\uFFEF#!/foo/bar/baz -abc\n# foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\n# foo',
      });

  });

  describe('Pass', () => {

      pass('\uFFEF#!/foo/bar/baz -abc\u2028! foo', Context.OptionsShebang | Context.Strict | Context.Module | Context.OptionsRanges, {
          source: '\uFFEF#!/foo/bar/baz -abc\u2028! foo',
          expected: {
              body: [{
                  end: 26,
                  expression: {
                      argument: {
                          end: 26,
                          name: 'foo',
                          start: 23,
                          type: 'Identifier'
                      },
                      end: 26,
                      operator: '!',
                      prefix: true,
                      start: 0,
                      type: 'UnaryExpression',
                  },
                  start: 0,
                  type: 'ExpressionStatement',
              }, ],
              end: 26,
              sourceType: 'module',
              start: 0,
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement',
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\n# foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n#! foo',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\r\n', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\r\n',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });
      pass('\uFFEF#!/foo/bar/baz -abc\nfoo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\nfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier'
                  },
                  type: 'ExpressionStatement',
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\u2029! foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\rfoo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\rfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier',
                  },
                  type: 'ExpressionStatement'
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\r\nfoo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\r\nfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier',
                  },
                  type: 'ExpressionStatement',
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\u2028', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\u2028',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\u2028! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\u2028! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier',
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression',
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });
  });
});
