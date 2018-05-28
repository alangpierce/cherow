import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Debugger', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('(debugger);', Context.Empty, {
          source: '(debugger);',
      });
  });

  describe('Pass', () => {

      pass(`debugger`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `debugger`,
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
                type: 'DebuggerStatement',
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
                }
              }
            ],
            sourceType: 'script'
          }

      });

      pass(`debugger`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `debugger;`,
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
                type: 'DebuggerStatement',
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
                }
              }
            ],
            sourceType: 'script'
          }

    });
  });

});
