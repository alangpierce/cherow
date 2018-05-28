import * as assert from 'clean-assert';
import * as t from 'assert';
import { parseModule, parseScript, parse } from '../../../src//cherow';
import { Context } from '../../../src/utilities';
import * as ESTree from '../../../src/estree';

describe('Cherow - API', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

   it('should parse script code with "parse"', () => {
      assert.match(parse('foo'), {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      });
  });

  it('should parse module code', () => {
      assert.match(parseModule('foo'), {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with impliedStrict and shebang option', () => {
      assert.match(parseScript('foo', {
          impliedStrict: true,
          skipShebang: true
      }), {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      });
  });

  it('should parse with comments option', () => {
      assert.match(parseModule('foo // bar', {
          comments: true,
          rawIdentifier: true
      }) as any, {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier',
                  raw: 'foo'
              },
              type: 'ExpressionStatement'
          }, ],
          comments: [{
              end: 10,
              start: 4,
              type: 'SingleLine',
              value: ' bar',
          }],
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with rawIdentifier option', () => {
      assert.match(parseModule('foo', {
          rawIdentifier: true
      }) as any, {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier',
                  raw: 'foo'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with raw option - number', () => {
      assert.match(parseModule('1', {
          raw: true
      }) as any, {
          body: [{
              expression: {
                  raw: '1',
                  type: 'Literal',
                  value: 1,
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with raw option - string', () => {
      assert.match(parseModule('"a"', {
          raw: true
      }) as any, {
          body: [{
              directive: 'a',
              expression: {
                  raw: '"a"',
                  type: 'Literal',
                  value: 'a',
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'module',
          type: 'Program',
      });
  });

  it('should parse with globalReturn option', () => {
      assert.match(parseModule('return', {
          globalReturn: true,
          next: true
      }) as any, {
          body: [{
              argument: null,
              type: 'ReturnStatement',
          }, ],
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with source option', () => {
      assert.match(parseModule('1', {
          loc: true,
          source: 'icefapper'
      }) as any, {
          body: [{
              expression: {
                  loc: {
                      end: {
                          column: 1,
                          line: 1,
                      },
                      source: 'icefapper',
                      start: {
                          column: 0,
                          line: 1,
                      }
                  },
                  type: 'Literal',
                  value: 1,
              },
              loc: {
                  end: {
                      column: 1,
                      line: 1,
                  },
                  source: 'icefapper',
                  start: {
                      column: 0,
                      line: 1,
                  }
              },
              type: 'ExpressionStatement',
          }, ],
          loc: {
              end: {
                  column: 1,
                  line: 1,
              },
              source: 'icefapper',
              start: {
                  column: 0,
                  line: 1
              }
          },
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with loc option', () => {
      assert.match(parseModule('1', {
          loc: true,
          node: true
      }) as any, {
          body: [{
              expression: {
                  loc: {
                      end: {
                          column: 1,
                          line: 1,
                      },
                      start: {
                          column: 0,
                          line: 1,
                      }
                  },
                  type: 'Literal',
                  value: 1,
              },
              loc: {
                  end: {
                      column: 1,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1,
                  },
              },
              type: 'ExpressionStatement'
          }, ],
          loc: {
              end: {
                  column: 1,
                  line: 1,
              },
              start: {
                  column: 0,
                  line: 1
              },
          },
          sourceType: 'module',
          type: 'Program'
      });
  });

  it('should parse with ranges option', () => {
      assert.match(parseModule('1', {
          ranges: true
      }) as any, {
          body: [{
              end: 1,
              expression: {
                  end: 1,
                  start: 0,
                  type: 'Literal',
                  value: 1,
              },
              start: 0,
              type: 'ExpressionStatement',
          }, ],
          end: 1,
          sourceType: 'module',
          start: 0,
          type: 'Program',
      });
  });

  it('should parse JSX', () => {
      assert.match(parseModule('<div />', {
          jsx: true
      }), {
          body: [{
              expression: {
                  children: [],
                  closingElement: null,
                  openingElement: {
                      attributes: [],
                      name: {
                          name: 'div',
                          type: 'JSXIdentifier'
                      },
                      selfClosing: true,
                      type: 'JSXOpeningElement'
                  },
                  type: 'JSXElement',
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'module',
          type: 'Program'
      });
  });
});
