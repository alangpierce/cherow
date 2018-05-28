import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Scoping', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe.skip('Failure', () => {

        const inValidSyntax = [
            `(function foo() { { let f = 2; { let y = 3; function f() { y = 2; } f(); } }})();`,
        ];

        for (const arg of inValidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [

            `(function foo(y, z) {{ function x() {} } })(1);`,
            // Complex parameter shouldn't be shadowed
            `(function foo(x = 0) { var x; { function x() {} } })(1);`,
            // Nested complex parameter shouldn't be shadowed
            `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
            // Complex parameter shouldn't be shadowed
            `(function foo(x = 0) { var x; { function x() {}} })(1);`,
            // Nested complex parameter shouldn't be shadowed
            `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
            // Rest parameter shouldn't be shadowed
            `(function foo(...x) { var x; {  function x() {}  } })(1);`,
            // Don't shadow complex rest parameter
            `(function foo(...[x]) { var x; { function x() {} } })(1);`,
            // Hoisting is not affected by other simple parameters
            `(function foo(y, z) {{function x() {}} })(1);`,
            // Hoisting is not affected by other complex parameters
            ` (function foo([y] = [], z) {{function x() {} } })();`,
            // Should allow shadowing function names
            `{(function foo() { { function foo() { return 0; } } })();}`,
            `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
            `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
            `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
            `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
            '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
            '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
            '(function foo() {function outer() { return f; } { f = 1; function f () {} f = ""; } })();',
            '(function foo(x) { {  function x() {} } })(1);',
            '(function foo([[x]]) { { function x() {}}})([[1]]);',
             // rest parameter shouldn't be shadowed
             '(function shadowingRestParameterDoesntBind(...x) { {  function x() {} } })(1);'
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});
