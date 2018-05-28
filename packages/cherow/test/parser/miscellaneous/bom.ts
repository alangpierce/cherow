import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - BOM', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

   pass(`BOM in an otherwise empty source`, Context.OptionsLoc | Context.OptionsRanges, {
    source: '\uFFEF',
    expected: {
          body: [],
          end: 1,
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
          sourceType: 'script',
          start: 0,
          type: 'Program'
        }
});

   pass(`BOM before an identifier`, Context.OptionsRaw, {
    source: '\uFFEFfoo',
    expected: {
          body: [
            {
              expression: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

});
