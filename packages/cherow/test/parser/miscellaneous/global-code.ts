import { fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Global code', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      // super in global scope
      fail(`() => { super(); };`, Context.Empty, {
          source: '() => { super.foo; };',
      });

      fail(`() => { super(); };`, Context.Empty, {
          source: '() => { super.foo; };',
      });

      fail(`super.property;`, Context.Empty, {
          source: 'super.property;',
      });

      fail(`return;`, Context.Empty, {
          source: 'return;',
      });

      fail(`export default null;`, Context.Empty, {
          source: 'export default null;',
      });

      //fail(`export default null;`, Context.Strict | Context.Module, {
      //    source: 'export default null;',
      //});

      //fail(`() => { new.target; };`, Context.Empty, {
      //  source: '() => { new.target; };',
      //});
  });
});
