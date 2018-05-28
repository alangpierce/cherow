import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Destructuring - Assignment', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '[x] += 0',
            '[...x, ] = 0;',
            '[, x, ...y,] = 0',
            '[...x, ...y] = 0',
            '[...x, y] = 0',
            '[0,{a=0}] = 0',
            'f({x = 0})',
            '[...x,,] = 0',
            '[{a=0},{b=0},0] = 0',
            '[{a=0},...0]',
            '[...0,a]=0',
            '[...0,{a=0}]=0',
            '[...0,...{a=0}]=0',
            '[...{a=0},]',
            '[...{a=0},]=0',
            '[0] = 0',
            '[a, ...b, {c=0}]',
            '{a = [...b, c]} = 0',
            '[a, ...(b = c)] = 0',
            '([a]) = 0',
            '({a = 0});',
            '({a} += 0);',
            '({a,,} = 0)',
            '({,a,} = 0)',
            '({a,,a} = 0)',
            '({function} = 0)',
            '({a:function} = 0)',
            '({a:for} = 0)',
            '({\'a\'} = 0)',
            '({var} = 0)',
            '({a.b} = 0)',
            '({0} = 0)',
            '{ x : ++y }',
            '{ x : y * 2 }',
            '{ get x() {} }',
            '{ set x() {} }',
            '{ x: y() }',
            '{ this }',
            '{ x: this }',
            '{ x: this = 1 }',
            '{ super }',
            '{ x: super }',
            '{ x: super = 1 }',
            '{ new.target }',
            '{ x: new.target }',
            '{ x: new.target = 1 }',
            '{ import.meta }',
            '{ x: import.meta }',
            '{ x: import.meta = 1 }',
            '[x--]',
            '[--x = 1]',
            '[x()]',
            '[this]',
            '[this = 1]',
            'var {a};',
            '[new.target]',
            '[new.target = 1]',
            '[import.meta]',
            '[import.meta = 1]',
            '[super]',
            '[super = 1]',
            '[function f() {}]',
            '[async function f() {}]',
            '[function* f() {}]',
            '([arguments] = []);',
            '[{ get x() {} }] = [{}];',
            '[...x, y] = [];',
            '[...[(x, y)]] = [[]];',
            '"use strict"; ({ eval } = {});',
            'assignmentResult = { x: x = yield } = value;',
            '"use strict";  ({ x: unresolvable } = {});',
            '[ c ] = [1];',
            '"use strict";  [ x ] = [];',
            '[50]',
            '[(50)]',
            '[(function() {})]',
            '[(async function() {})]',
            '[(function*() {})]',
            '[(foo())]',
            '{ x: 50 }',
            '{ x: (50) }',
            '[\'str\']',
            '{ x: \'str\' }',
            '{ x: (\'str\') }',
            '{ x: (foo()) }',
            '{ x: function() {} }',
            '{ x: async function() {} }',
            '{ x: function*() {} }',
            '{ x: (function() {}) }',
            '{ x: (async function() {}) }',
            '{ x: (function*() {}) }',
            '{ x: y } = \'str\'',
            '[x, y] = \'str\'',
            '[(x,y) => z]',
            '[async(x,y) => z]',
            '[async x => z]',
            '{x: (y) => z}',
            '{x: (y,w) => z}',
            '{x: async (y) => z}',
            '{x: async (y,w) => z}',
            '[x, ...y, z]',
            '[...x,]',
            '[...++x]',
            '[...x--]',
            '[...!x]',
            '[...x + y]',
            '({ x: x4, x: (x+=1e4) })',
            '(({ x: x4, x: (x+=1e4) }))',
            '({ x: x4, x: (x+=1e4) } = {})',
            '(({ x: x4, x: (x+=1e4) } = {}))',
            '(({ x: x4, x: (x+=1e4) }) = {})',
            '({ x: y } = {})',
            '(({ x: y } = {}))',
            '(({ x: y }) = {})',
            '([a])',
            '(([a]))',
            '([a] = [])',
            '(([a] = []))',
            '(([a]) = [])',
            '({a:this}=0)',
            '({a:this}=0)',
            '({a: this} = 0);',
            '{ x: ([y]) }',
            '{ x: ([y] = []) }',
            '{ x: ({y}) }',
            '{ x: ({y} = {}) }',
            '{ x: (++y) }',
            '[ (...[a]) ]',
            '[ ...([a]) ]',
            '[ ...([a] = [])',
            '[ ...[ ( [ a ] ) ] ]',
            '[ ([a]) ]',
            '[ (...[a]) ]',
            '[ ([a] = []) ]',
            '[ (++y) ]',
            '[ ...(++y) ]',
            '[ x += x ]',
            '[x[yield]]] = value;',
            '{ foo: x += x }',
            '([arguments] = []);',
            '"use strict"; [ x = yield ] = [];',
            '[[(x, y)]] = [[]];',
            '[[ x ]] = [null];',
            '[[ x ]] = [ , ];',
            '[[ x ]] = [undefined];',
            '[[ x ]] = [];',
            '"use strict"; [[x[yield]]] = 123;',
            '[...x,] = [];',
            '[...x, ...y] = [];',
            '"use strict"; [...{ x = yield }] = [{}];',
            'let [{a, ...[]}] = [{/*...*/}]; // invalid;',
            'let {a, ...[]} = {/*...*/}; // invalid;',
            'let {a, ...[b]} = {/*...*/}; // invalid;',
            'let {a, ...{}} = {/*...*/}; // invalid;',
            'let {a, ...{b}} = {/*...*/}; // invalid;',
        ];

        for (const arg of invalidSyntax) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; (${arg} = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x in x =  ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x in x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of x =  ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x of x = ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; (x = ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; (x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of ${arg}= z = {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x in ${arg} = z = {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x in x = ${arg}  = z = {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; for (x in x = ${arg}  = z = {});`, undefined, Context.Empty);
                });
            });
        }
        // https://github.com/jquery/esprima/issues/1568
        fail('(a,b)=(c,d);', Context.Empty, {
            source: '(a,b)=(c,d);',
        });

        fail('({get a(){}})=0', Context.Empty, {
            source: '({get a(){}})=0',
        });

        fail('(a = b)++;', Context.Empty, {
            source: '(a = b)++;',
        });

        fail('(a = b) = c;', Context.Empty, {
            source: '(a = b) = c;',
        });

        fail('`a`++;', Context.Empty, {
            source: '`a`++;',
        });

        fail('`a` = b;', Context.Empty, {
            source: '`a` = b;',
        });

        fail('for (`a` in b);', Context.Empty, {
            source: 'for (`a` in b);',
        });

        fail('for (`a` of b);', Context.Empty, {
            source: 'for (`a` of b);',
        });

        fail('(`a`) => b;', Context.Empty, {
            source: '(`a`) => b;',
        });

        // fail('function f() {  (new.target) => b;}', Context.Empty, {
        // source: 'function f() {  (new.target) => b;}',
        // });

        fail(`function f() {
new.target++;
new.target = b;
for (new.target in b);
for (new.target of b);
}`, Context.Empty, {
            source: `function f() {
  new.target++;
  new.target = b;
  for (new.target in b);
  for (new.target of b);
}`,
        });

    });

    describe('Pass', () => {

        // Valid syntax - number assignment RHS

        const RHS_Numbers = [
            'x',
            '[x,] = 0',
            '[x,,] = 0',
            '[[x]] = 0',
            '[, x,,] = 0',
            '[...[x]] = 0',
            '[...{x = 1}] = [{}]',
            '[...[x]] = 0',
            '[x, ...{0: y}] = 0',
            '[x, x] = 0',
            '[x, ...x] = 0',
            '[(a)] = 0',
            '({x} = 0)',
            'let {a, ...b} = {/*...*/}; // valid;',
            '[ x = \'x\' in {} ] = value;',
            'a = [ a = x += 1, b = x *= 2 ] = value;',
            ' [[ x ]] = [null]',
            '[{ x }] = [null];',
            '[{ x }] = [];',
            '[{ x }] = [ , ];',
            'a = [{ x = yield }] = value;',
            'a = [[x[yield]]] = 123;',
            '[{ x }] = [null];',
            ' [{ x }] = [];',
            'a = [{ x }] =  [{ x: 2 }];',
            'a = [x.y] = [123];',
            '[x, ...y] = [1, 2, 3];',
            '[, ...x] = [1, 2, 3];',
            'a = [x.y] = value;',
            'a = [ x[yield] ] = [33];',
            'a = [...[x, y]] = [null];',
            'a = [...[x]] = [ , ];',
            'a = [...{ 0: x, length }] = [undefined];',
            'a = [...{ 1: x }] =  [1, 2, 3];',
            'a = [...x.y] = [4, 3, 2];',
            'a = [...[x[yield]]] = [2018];',
            'a = [...{ 0: x, length }] = value;',
            'a = [...{ 1: x }] = [1, 2, 3];',
            ' [,] = undefined;',
            ' [,] = null;',
            ' [,] = 1;',
            ' [,] = \'icefapper\';',
            ' [,] = []',
            ' [,] = undefined;',
            'a = { prop = \'x\' in {} } = value;',
            'a = { x = 1 } = value;',
            '({ x = y } = {});',
            'a = { x: x = yield } = { a: 1 };',
            'a = { x: [x = yield] } =  { x: [321] };',
            'a = { x: [y] } =  { x: [321] };',
            'a = { x: { y } } =  { x: { y: 2 } };',
            'a = { xy: x.y } = { xy: 4 };',
            'a = [, , x, , ...y] = [1, 2, 3, 4, 5, 6];',
            '[[x]] = [[1]];',
            '[[ x ]] = [null];',
            'a = [ x = yield ] = [];',
            '[ x = y ] = [];',
            'result = [, x, , y, ,] = [1, 2, 3, 4, 5, 6];',
            'x = [ x = 14 ] = [,];',
            'a = [ x = flag = true ] = [];',
            ' [ x = y ] = [];',
            'a = [ a = x += 1, b = x *= 2 ] = [];',
            'a = [arguments = 4, eval = 5] = value;',
            '({x=0, y:z} = 0)',
            '({x,} = 0)',
            '({x,y} = 0)',
            '({x,y,} = 0)',
            '({[a]: a} = 1)',
            '({x = 0} = 1)',
            '({ test = 1 } = {})',
            '({x = 0,} = 1)',
            '({x: y} = 0)',
            '({x: y,} = 0)',
            '({var: x} = 0)',
            '({\'x\': y} = 0)',
            '({0: y} = 0)',
            '({0: x, 1: x} = 0)',
            '({x: y = 0} = 1)',
            '({x: y = z = 0} = 1)',
            '({x: [y] = 0} = 1)',
            '({a:let} = 0);',
            '({let} = 0);',
            '({a:yield} = 0);',
            '({yield} = 0);',
            '({yield = 0} = 0);',
            'let {a:b=c} = 0;',
            '(function*() { [...{ x = yield }] = 0; })',
            '({d=0,f:h().a} = 0)',
            '[a,b=0,[c,...a[0]]={}]=0',
            '[a] = 0;',
            '[a,a,,...a]=0;',
            '[,,]=0',
            '[...a[0]] = 0;',
            '[{a=b}=0]',
            '[{a=0}, ...b] = 0',
            '[a = 0, ...{b = 0}] = 0',
            '[[x]] = 0',
            '[x.a=a] = 0',
            '[x[a]=a] = 0',
            'function f({x = f}) { let f; return x; }',
            'function f1({a = x}, x) { return a }',
            'function f5({a = () => x}, x) { return a() }',
            'function f11({a = b}, {b}) { return a }',
            'function f15({a = () => b}, {b}) { return a() }',
            'function f30({x = a}, ...a) { return x[0] }',
            'function f34({x = function() { return a }}, ...a) { return x()[0] }',
            'function f35({x = () => a}, ...a) { return x()[0] }',
            'var g30 = ({x = a}, ...a) => {};',
            'var g35 = ({x = () => a}, ...a) => { return x()[0] };',
            'function f1({x}) { var x = 2; return x }',
            'function f10({x}, y) { var y; return y }',
            '(function([ x = y = 1 ]) {}([]));',
            '[{a=0},{a=0}] = 0',
            '[] = 0',
            '[...[...a[x]]] = 1',
            'const {x,x} = {x:1};',
            'let {x = (function() { x = 2; }())} = {};',
            'for (const {x, z} = { x : 0, z : 3 }; z != 3 || x != 0;) {}',
            'for (let {x, z} = { x : 0, z : 3 }; z != 0; z--) {}',
            'var g1 = ({x}) => { var x = 2; return x };',
            'var g7 = ({x}) => { var g = () => x; var x = 2; return g(); };',
            'var g10 = ({x}, y) => { var y; return y };',
            'function f7({a: x}) { x = 2; return arguments[0].a }',
            '(function({x}, {y} = {}, {z}, {v} = {}, ...a) {})',
            '(function(x, {y} = {}, {z}, {v} = {}) {})',
            '(function({x}, {y} = {}, {z}, ...a) {})',
            '(function(x, {y}, {z} = {}) {})',
            'try {throw {foo: 1, bar: 2}} catch({foo}) {}',
            'try {throw [1, 2, 3]} catch([x]) {}',
            '[[[[[[[[[[[[[[[[[[[[{a=b[0]}]]]]]]]]]]]]]]]]]]]]=0;',
            `({
              a,
              a:a,
              a:a=a,
              [a]:{a},
              a:some_call()[a],
              a:this.a
          } = 0);`
        ];

        for (const arg of RHS_Numbers) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        const validSyntax = [
            'x',
            '[x,]',
            '[x,,]',
            '[[x]]',
            '{ x : y.z }',
            '{ x : y[z] }',
            '{ x : y }',
            '{ x : foo().y }',
            '{ x : foo()[y] }',
            '{ x : y.z }',
            '{ x : y[z] }',
            '{ x : y }',
            '{ x : foo().y }',
            '{ x : foo()[y] }',
            '{ x : y.z }',
            '{ x : y[z] }',
            '{ x : { y } }',
            '{ x : { foo: y } }',
            '{ x : { foo: foo().y } }',
            '{ x : { foo: foo()[y] } }',
            '{ x : { foo: y.z } }',
            '{ x : { foo: y[z] } }',
            '{ x : [ y ] }',
            '{ x : [ foo().y ] }',
            '{ x : [ foo()[y] ] }',
            '{ x : [ y.z ] }',
            '{ x : [ y[z] ] }',
            '{ x : y = 10 }',
            '{ x : foo().y = 10 }',
            '{ x : foo()[y] = 10 }',
            '{ x : y.z = 10 }',
            '{ x : y[z] = 10 }',
            '{ x : { y = 10 } = {} }',
            '{ x : { foo: y = 10 } = {} }',
            '{ x : { foo: foo().y = 10 } = {} }',
            '{ x : { foo: foo()[y] = 10 } = {} }',
            '{ x : { foo: y.z = 10 } = {} }',
            '{ x : { foo: y[z] = 10 } = {} }',
            '{ x : [ y = 10 ] = {} }',
            '{ x : [ foo().y = 10 ] = {} }',
            '{ x : [ foo()[y] = 10 ] = {} }',
            '{ x : [ y.z = 10 ] = {} }',
            '{ x : [ y[z] = 10 ] = {} }',
            //"{ z : { __proto__: x, __proto__: y } = z }",
            '[ x ]',
            '[ foo().x ]',
            '[ foo()[x] ]',
            '[ x.y ]',
            '[ x[y] ]',
            '[ { x } ]',
            '[ { x : y } ]',
            '[ { x : foo().y } ]',
            '[ { x : foo()[y] } ]',
            '[ { x : x.y } ]',
            '[ { x : x[y] } ]',
            '[ [ x ] ]',
            '[ [ foo().x ] ]',
            '[ [ foo()[x] ] ]',
            '[ [ x.y ] ]',
            '[ [ x[y] ] ]',
            '[ x = 10 ]',
            '[ foo().x = 10 ]',
            '[ foo()[x] = 10 ]',
            '[ x.y = 10 ]',
            '[ x[y] = 10 ]',
            '[ { x = 10 } = {} ]',
            '[ { x : y = 10 } = {} ]',
            '[ { x : foo().y = 10 } = {} ]',
            '[ { x : foo()[y] = 10 } = {} ]',
            '[ { x : x.y = 10 } = {} ]',
            '[ { x : x[y] = 10 } = {} ]',
            '[ [ x = 10 ] = {} ]',
            '[ [ foo().x = 10 ] = {} ]',
            '[ [ foo()[x] = 10 ] = {} ]',
            '[ [ x.y = 10 ] = {} ]',
            '[ [ x[y] = 10 ] = {} ]',
            '{ x : y = 1 }',
            '{ x }',
            '{ x, y, z }',
            '{ x = 1, y: z, z: y }',
            '{x = 42, y = 15}',
            '[x]',
            '[x = 1]',
            '[x,y,z]',
            '[x, y = 42, z]',
            '{ x : x, y : y }',
            '{ x : x = 1, y : y }',
            '{ x : x, y : y = 42 }',
            '[]',
            '{}',
            '[{x:x, y:y}, [,x,z,]]',
            '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]]',
            '[x,,y]',
            '[(x),,(y)]',
            '[(x)]',
            '{42 : x}',
            '{42 : x = 42}',
            '{42e-2 : x}',
            '{42e-2 : x = 42}',
            '{\'hi\' : x}',
            '{\'hi\' : x = 42}',
            '{var: x}',
            '{var: x = 42}',
            '{var: (x) = 42}',
            '{[x] : z}',
            '{[foo()] : z}',
            '{[foo()] : (z)}',
            '{[foo()] : foo().bar}',
            '{[foo()] : foo()[\'bar\']}',
            '{[foo()] : this.bar}',
            '{[foo()] : this[\'bar\']}',
            '{[foo()] : \'foo\'.bar}',
            '{[foo()] : \'foo\'[\'bar\']}',
            '[...x]',
            '[x,y,...z]',
            '[x,,...z]',
            '{ x: y }',
            '[x, y]',
            '[((x, y) => z).x]',
            '{x: ((y, z) => z).x}',
            '[((x, y) => z)[\'x\']]',
            '{x: ((y, z) => z)[\'x\']}',
            '{x: { y = 10 } }',
            '[(({ x } = { x: 1 }) => x).a]',
            '{ ...d.x }',
            '{ ...c[0]}',
            '{ x: (y) }',
            '{ x: (y) = [] }',
            '{ x: (foo.bar) }',
            '{ x: (foo[\'bar\']) }',
            '[ ...(a) ]',
            '[ ...(foo[\'bar\']) ]',
            '[ ...(foo.bar) ]',
            '[ (y) ]',
            '[ (foo.bar) ]',
            '[ (foo[\'bar\']) ]',
            'a',
            '{ x : y }',
            '{ x : y = 1 }',
            '[a = 1]',
            '{x = 42, y = 15}',
            '{42e-2 : x}',
            '{42e-2 : x = 42}',
        ];
        for (const arg of validSyntax) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; (${arg} = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x in x =  ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; for (x in x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of x =  ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x of x = ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; (x = ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var x, y, z; (x = ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; let x, y, z; for (x of ${arg}= z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x in ${arg} = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x in x = ${arg}  = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var x, y, z; for (x in x = ${arg}  = z = {});`, undefined, Context.Empty);
                });
            });

            it(`var x, y, z; for (x of x = ${arg}  = z = {});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var x, y, z; for (x of x = ${arg}  = z = {});`, undefined, Context.Empty);
                });
            });
        }

        const ambiguity = [
            'var foo = { x = 10 } = {};',
            'var foo = { q } = { x = 10 } = {};',
            'var foo; foo = { x = 10 } = {};',
            'var foo; foo = { q } = { x = 10 } = {};',
            'var x; ({ x = 10 } = {});',
            'var q, x; ({ q } = { x = 10 } = {});',
            'var x; [{ x = 10 } = {}]',
            'var x; (true ? { x = true } = {} : { x = false } = {})',
            'var q, x; (q, { x = 10 } = {});',
            'var { x = 10 } = { x = 20 } = {};',
            //"var { __proto__: x, __proto__: y } = {}",
            //"({ __proto__: x, __proto__: y } = {})",
            'var { x = 10 } = (o = { x = 20 } = {});',
            'var x; (({ x = 10 } = { x = 20 } = {}) => x)({})',
        ];

        for (const arg of ambiguity) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass('[x, y, ...z = 1]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[x, y, ...z = 1]',
            expected: {
                type: 'Program',
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    expression: {
                        type: 'ArrayExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        elements: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            },
                            {
                                type: 'SpreadElement',
                                start: 7,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                argument: {
                                    type: 'AssignmentExpression',
                                    start: 10,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    operator: '=',
                                    left: {
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
                                        name: 'z'
                                    },
                                    right: {
                                        type: 'Literal',
                                        start: 14,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function a(a = b += 1, c = d +=1) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function a(a = b += 1, c = d +=1) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 36,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    },
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        name: 'a'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                            type: 'AssignmentPattern',
                            start: 11,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 11,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                name: 'a'
                            },
                            right: {
                                type: 'AssignmentExpression',
                                start: 15,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                },
                                operator: '+=',
                                left: {
                                    type: 'Identifier',
                                    start: 15,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    name: 'b'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 20,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                }
                            }
                        },
                        {
                            type: 'AssignmentPattern',
                            start: 23,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 23,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'c'
                            },
                            right: {
                                type: 'AssignmentExpression',
                                start: 27,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                },
                                operator: '+=',
                                left: {
                                    type: 'Identifier',
                                    start: 27,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    },
                                    name: 'd'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 31,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        start: 34,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 34
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[...z = 1]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[...z = 1]',
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    },
                    expression: {
                        type: 'ArrayExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        elements: [{
                            type: 'SpreadElement',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            argument: {
                                type: 'AssignmentExpression',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                operator: '=',
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'z'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[x, y, ...[z] = [1]]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[x, y, ...[z] = [1]]',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    expression: {
                        type: 'ArrayExpression',
                        start: 0,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        elements: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            },
                            {
                                type: 'SpreadElement',
                                start: 7,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                argument: {
                                    type: 'AssignmentExpression',
                                    start: 10,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    },
                                    operator: '=',
                                    left: {
                                        type: 'ArrayPattern',
                                        start: 10,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        },
                                        elements: [{
                                            type: 'Identifier',
                                            start: 11,
                                            end: 12,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 11
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 12
                                                }
                                            },
                                            name: 'z'
                                        }]
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        start: 16,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        },
                                        elements: [{
                                            type: 'Literal',
                                            start: 17,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 18
                                                }
                                            },
                                            value: 1,
                                            raw: '1'
                                        }]
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[...[z] = [1]]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[...[z] = [1]]',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrayExpression',
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        elements: [{
                            type: 'SpreadElement',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            argument: {
                                type: 'AssignmentExpression',
                                start: 4,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                },
                                operator: '=',
                                left: {
                                    type: 'ArrayPattern',
                                    start: 4,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    elements: [{
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'z'
                                    }]
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    start: 10,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    elements: [{
                                        type: 'Literal',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    }]
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });
        pass('[x, {y = 1}] = [0, {}]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[x, {y = 1}] = [0, {}]',
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
                            start: 0,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'x'
                                },
                                {
                                    type: 'ObjectPattern',
                                    start: 4,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 5,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 5,
                                            end: 6,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 6
                                                }
                                            },
                                            name: 'y'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 5,
                                            end: 10,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 10
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 5,
                                                end: 6,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 5
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 6
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 9,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                },
                                                value: 1,
                                                raw: '1'
                                            }
                                        }
                                    }]
                                }
                            ]
                        },
                        right: {
                            type: 'ArrayExpression',
                            start: 15,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            elements: [{
                                    type: 'Literal',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                },
                                {
                                    type: 'ObjectExpression',
                                    start: 19,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    properties: []
                                }
                            ]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[x, {y = 1}] = [0, {}]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[x, {y = 1}] = [0, {}]',
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
                            start: 0,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'x'
                                },
                                {
                                    type: 'ObjectPattern',
                                    start: 4,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 5,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 5,
                                            end: 6,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 6
                                                }
                                            },
                                            name: 'y'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 5,
                                            end: 10,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 10
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 5,
                                                end: 6,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 5
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 6
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 9,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                },
                                                value: 1,
                                                raw: '1'
                                            }
                                        }
                                    }]
                                }
                            ]
                        },
                        right: {
                            type: 'ArrayExpression',
                            start: 15,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            elements: [{
                                    type: 'Literal',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                },
                                {
                                    type: 'ObjectExpression',
                                    start: 19,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    properties: []
                                }
                            ]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('for ({a = 0} of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'for ({a = 0} of [{}]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                },
                body: [{
                    type: 'ForOfStatement',
                    await: false,
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    },
                    left: {
                        type: 'ObjectPattern',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        properties: [{
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                                name: 'a'
                            },
                            kind: 'init',
                            value: {
                                type: 'AssignmentPattern',
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
                                    name: 'a'
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 0,
                                    raw: '0'
                                }
                            }
                        }]
                    },
                    right: {
                        type: 'ArrayExpression',
                        start: 16,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        elements: [{
                            type: 'ObjectExpression',
                            start: 17,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            properties: []
                        }]
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 22,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({x = 1, y = 2} = {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({x = 1, y = 2} = {})',
            expected: {
                type: 'Program',
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ObjectPattern',
                            start: 1,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 2,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                        name: 'x'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 2,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        },
                                        left: {
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
                                            name: 'x'
                                        },
                                        right: {
                                            type: 'Literal',
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
                                            value: 1,
                                            raw: '1'
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 9,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        },
                                        name: 'y'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 9,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 9,
                                            end: 10,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 9
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 10
                                                }
                                            },
                                            name: 'y'
                                        },
                                        right: {
                                            type: 'Literal',
                                            start: 13,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            },
                                            value: 2,
                                            raw: '2'
                                        }
                                    }
                                }
                            ]
                        },
                        right: {
                            type: 'ObjectExpression',
                            start: 18,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            properties: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var {x: x = 10, y: y = 10, z: z = 10} = a;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {x: x = 10, y: y = 10, z: z = 10} = a;',
            expected: {
                type: 'Program',
                start: 0,
                end: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 42
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 5,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'x'
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 8,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 8,
                                            end: 9,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 9
                                                }
                                            },
                                            name: 'x'
                                        },
                                        right: {
                                            type: 'Literal',
                                            start: 12,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            },
                                            value: 10,
                                            raw: '10'
                                        }
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 16,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 16,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        },
                                        name: 'y'
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 19,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 19,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            },
                                            name: 'y'
                                        },
                                        right: {
                                            type: 'Literal',
                                            start: 23,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            },
                                            value: 10,
                                            raw: '10'
                                        }
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 27,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 27,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        },
                                        name: 'z'
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 30,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 30,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            name: 'z'
                                        },
                                        right: {
                                            type: 'Literal',
                                            start: 34,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            },
                                            value: 10,
                                            raw: '10'
                                        }
                                    },
                                    kind: 'init'
                                }
                            ]
                        },
                        init: {
                            type: 'Identifier',
                            start: 40,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 40
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            },
                            name: 'a'
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('function x({a}) { try { var {b} = a; }  catch({stack}) { }  };', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function x({a}) { try { var {b} = a; }  catch({stack}) { }  };',
            expected: {
                type: 'Program',
                start: 0,
                end: 62,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 62
                    }
                },
                body: [{
                        type: 'FunctionDeclaration',
                        start: 0,
                        end: 61,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 61
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'x'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 11,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 12,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'a'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'a'
                                }
                            }]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 16,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            },
                            body: [{
                                type: 'TryStatement',
                                start: 18,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                },
                                block: {
                                    type: 'BlockStatement',
                                    start: 22,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    },
                                    body: [{
                                        type: 'VariableDeclaration',
                                        start: 24,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        declarations: [{
                                            type: 'VariableDeclarator',
                                            start: 28,
                                            end: 35,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35
                                                }
                                            },
                                            id: {
                                                type: 'ObjectPattern',
                                                start: 28,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                },
                                                properties: [{
                                                    type: 'Property',
                                                    start: 29,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
                                                    computed: false,
                                                    key: {
                                                        type: 'Identifier',
                                                        start: 29,
                                                        end: 30,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 29
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 30
                                                            }
                                                        },
                                                        name: 'b'
                                                    },
                                                    kind: 'init',
                                                    value: {
                                                        type: 'Identifier',
                                                        start: 29,
                                                        end: 30,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 29
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 30
                                                            }
                                                        },
                                                        name: 'b'
                                                    }
                                                }]
                                            },
                                            init: {
                                                type: 'Identifier',
                                                start: 34,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                },
                                                name: 'a'
                                            }
                                        }],
                                        kind: 'var'
                                    }]
                                },
                                handler: {
                                    type: 'CatchClause',
                                    start: 40,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 40
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    },
                                    param: {
                                        type: 'ObjectPattern',
                                        start: 46,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 47,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 47
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 52
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 47,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 47
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                },
                                                name: 'stack'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'Identifier',
                                                start: 47,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 47
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                },
                                                name: 'stack'
                                            }
                                        }]
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        start: 55,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 55
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        },
                                        body: []
                                    }
                                },
                                finalizer: null
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 61,
                        end: 62,
                        loc: {
                            start: {
                                line: 1,
                                column: 61
                            },
                            end: {
                                line: 1,
                                column: 62
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass('var {x: y, z: { a: b } } = { x: "3", z: { a: "b" } };', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {x: y, z: { a: b } } = { x: "3", z: { a: "b" } };',
            expected: {
                type: 'Program',
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 5,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'x'
                                    },
                                    value: {
                                        type: 'Identifier',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        },
                                        name: 'y'
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 11,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        },
                                        name: 'z'
                                    },
                                    value: {
                                        type: 'ObjectPattern',
                                        start: 14,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 16,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 16,
                                                end: 17,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 17
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                start: 19,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                },
                                                name: 'b'
                                            },
                                            kind: 'init'
                                        }]
                                    },
                                    kind: 'init'
                                }
                            ]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 27,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 29,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 29,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        },
                                        name: 'x'
                                    },
                                    value: {
                                        type: 'Literal',
                                        start: 32,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        },
                                        value: '3',
                                        raw: '"3"'
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 37,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 37
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 37,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        },
                                        name: 'z'
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        start: 40,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 42,
                                            end: 48,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 48
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 42,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            value: {
                                                type: 'Literal',
                                                start: 45,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 45
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 48
                                                    }
                                                },
                                                value: 'b',
                                                raw: '"b"'
                                            },
                                            kind: 'init'
                                        }]
                                    },
                                    kind: 'init'
                                }
                            ]
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('function x([ a, b ]){};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function x([ a, b ]){};',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                        type: 'FunctionDeclaration',
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'x'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 11,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 13,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'Identifier',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'b'
                                }
                            ]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 20,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            body: []
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 22,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass('function a([x, , [, z]]) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function a([x, , [, z]]) {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                        type: 'FunctionDeclaration',
                        start: 0,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'a'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 11,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'x'
                                },
                                null,
                                {
                                    type: 'ArrayPattern',
                                    start: 17,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    elements: [
                                        null,
                                        {
                                            type: 'Identifier',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            },
                                            name: 'z'
                                        }
                                    ]
                                }
                            ]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 25,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            body: []
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 27,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass('[a,,b] = array;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[a,,b] = array;',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'a'
                                },
                                null,
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'b'
                                }
                            ]
                        },
                        right: {
                            type: 'Identifier',
                            start: 9,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            name: 'array'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var [x = 10, y, z] = a;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [x = 10, y, z] = a;',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            elements: [{
                                    type: 'AssignmentPattern',
                                    start: 5,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'Literal',
                                        start: 9,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        },
                                        value: 10,
                                        raw: '10'
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    start: 13,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    name: 'y'
                                },
                                {
                                    type: 'Identifier',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'z'
                                }
                            ]
                        },
                        init: {
                            type: 'Identifier',
                            start: 21,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            name: 'a'
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('[ok.v] = 20;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[ok.v] = 20;',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            elements: [{
                                type: 'MemberExpression',
                                start: 1,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                object: {
                                    type: 'Identifier',
                                    start: 1,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'ok'
                                },
                                property: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'v'
                                },
                                computed: false
                            }]
                        },
                        right: {
                            type: 'Literal',
                            start: 9,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            },
                            value: 20,
                            raw: '20'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(' x = { f: function(a=1) {} }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x = { f: function(a=1) {} }',
            expected: {
                type: 'Program',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'x'
                        },
                        right: {
                            type: 'ObjectExpression',
                            start: 4,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 6,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                    name: 'f'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    start: 9,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'AssignmentPattern',
                                        start: 18,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 18,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Literal',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            },
                                            value: 1,
                                            raw: '1'
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 23,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        body: []
                                    }
                                },
                                kind: 'init'
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var foo = function(a, b = 42, c) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var foo = function(a, b = 42, c) {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 36,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            name: 'foo'
                        },
                        init: {
                            type: 'FunctionExpression',
                            start: 10,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 19,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'AssignmentPattern',
                                    start: 22,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 22,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        name: 'b'
                                    },
                                    right: {
                                        type: 'Literal',
                                        start: 26,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        },
                                        value: 42,
                                        raw: '42'
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    start: 30,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    name: 'c'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 33,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                },
                                body: []
                            }
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('([y]) => x;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([y]) => x;',
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
                body: [{
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            elements: [{
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
                                name: 'y'
                            }]
                        }],
                        body: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({y}) => x;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({y}) => x;',
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
                body: [{
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            properties: [{
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                    name: 'y'
                                },
                                kind: 'init',
                                value: {
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
                                    name: 'y'
                                }
                            }]
                        }],
                        body: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({x = 10}) => x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({x = 10}) => x',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 2,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                    name: 'x'
                                },
                                kind: 'init',
                                value: {
                                    type: 'AssignmentPattern',
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    left: {
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
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'Literal',
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
                                        value: 10,
                                        raw: '10'
                                    }
                                }
                            }]
                        }],
                        body: {
                            type: 'Identifier',
                            start: 14,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function f([x] = [1]) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f([x] = [1]) {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                        type: 'FunctionDeclaration',
                        start: 0,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'f'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 11,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            left: {
                                type: 'ArrayPattern',
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                },
                                elements: [{
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'x'
                                }]
                            },
                            right: {
                                type: 'ArrayExpression',
                                start: 17,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                elements: [{
                                    type: 'Literal',
                                    start: 18,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                }]
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 22,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            body: []
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 24,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 24
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass('f = function({x} = {x: 10}) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'f = function({x} = {x: 10}) {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 31,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        right: {
                            type: 'FunctionExpression',
                            start: 4,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                type: 'AssignmentPattern',
                                start: 13,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                left: {
                                    type: 'ObjectPattern',
                                    start: 13,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 14,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 14,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            },
                                            name: 'x'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'Identifier',
                                            start: 14,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            },
                                            name: 'x'
                                        }
                                    }]
                                },
                                right: {
                                    type: 'ObjectExpression',
                                    start: 19,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 20,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            },
                                            name: 'x'
                                        },
                                        value: {
                                            type: 'Literal',
                                            start: 23,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            },
                                            value: 10,
                                            raw: '10'
                                        },
                                        kind: 'init'
                                    }]
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                start: 28,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                body: []
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('const [a] = [];', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'const [a] = [];',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 6,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 6,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            elements: [{
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'a'
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 12,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            elements: []
                        }
                    }],
                    kind: 'const'
                }],
                sourceType: 'script'
            }
        });

        pass('const {a:b} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'const {a:b} = {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 6,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
                                start: 7,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    name: 'a'
                                },
                                value: {
                                    type: 'Identifier',
                                    start: 9,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    },
                                    name: 'b'
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'const'
                }],
                sourceType: 'script'
            }
        });

        pass('function f({ [e]: {}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f({ [e]: {}}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        name: 'f'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 11,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 13,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                                type: 'Identifier',
                                start: 14,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                name: 'e'
                            },
                            value: {
                                type: 'ObjectPattern',
                                start: 18,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                properties: []
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 23,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[{a = 0}] = [{}];', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[{a = 0}] = [{}];',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'ObjectPattern',
                                start: 1,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 2,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 2,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        },
                                        left: {
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
                                        },
                                        right: {
                                            type: 'Literal',
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
                                            value: 0,
                                            raw: '0'
                                        }
                                    }
                                }]
                            }]
                        },
                        right: {
                            type: 'ArrayExpression',
                            start: 12,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            elements: [{
                                type: 'ObjectExpression',
                                start: 13,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                properties: []
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var [{a = 0}] = [{}];', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [{a = 0}] = [{}];',
            expected: {
                type: 'Program',
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            elements: [{
                                type: 'ObjectPattern',
                                start: 5,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                        name: 'a'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
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
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Literal',
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
                                            value: 0,
                                            raw: '0'
                                        }
                                    }
                                }]
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 16,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            elements: [{
                                type: 'ObjectExpression',
                                start: 17,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                properties: []
                            }]
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('{ let [{a = 0}] = [{}]; }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '{ let [{a = 0}] = [{}]; }',
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'BlockStatement',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    body: [{
                        type: 'VariableDeclaration',
                        start: 2,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        declarations: [{
                            type: 'VariableDeclarator',
                            start: 6,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            id: {
                                type: 'ArrayPattern',
                                start: 6,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                elements: [{
                                    type: 'ObjectPattern',
                                    start: 7,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 8,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 8,
                                            end: 9,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 9
                                                }
                                            },
                                            name: 'a'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 8,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 8,
                                                end: 9,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 9
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 12,
                                                end: 13,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 13
                                                    }
                                                },
                                                value: 0,
                                                raw: '0'
                                            }
                                        }
                                    }]
                                }]
                            },
                            init: {
                                type: 'ArrayExpression',
                                start: 18,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                elements: [{
                                    type: 'ObjectExpression',
                                    start: 19,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    properties: []
                                }]
                            }
                        }],
                        kind: 'let'
                    }]
                }],
                sourceType: 'script'
            }
        });

        pass('function f([...[{a = 0}]]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f([...[{a = 0}]]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 29,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    },
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        name: 'f'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 11,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        elements: [{
                            type: 'RestElement',
                            start: 12,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            argument: {
                                type: 'ArrayPattern',
                                start: 15,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                elements: [{
                                    type: 'ObjectPattern',
                                    start: 16,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 17,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 17,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 18
                                                }
                                            },
                                            name: 'a'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 17,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 17,
                                                end: 18,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 18
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 21,
                                                end: 22,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 22
                                                    }
                                                },
                                                value: 0,
                                                raw: '0'
                                            }
                                        }
                                    }]
                                }]
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 27,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var h = ([...[{a = 0}]]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var h = ([...[{a = 0}]]) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 31,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            },
                            name: 'h'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                type: 'ArrayPattern',
                                start: 9,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                elements: [{
                                    type: 'RestElement',
                                    start: 10,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    argument: {
                                        type: 'ArrayPattern',
                                        start: 13,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        elements: [{
                                            type: 'ObjectPattern',
                                            start: 14,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
                                                start: 15,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 15,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    },
                                                    name: 'a'
                                                },
                                                kind: 'init',
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    start: 15,
                                                    end: 20,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 20
                                                        }
                                                    },
                                                    left: {
                                                        type: 'Identifier',
                                                        start: 15,
                                                        end: 16,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 15
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 16
                                                            }
                                                        },
                                                        name: 'a'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        start: 19,
                                                        end: 20,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 20
                                                            }
                                                        },
                                                        value: 0,
                                                        raw: '0'
                                                    }
                                                }
                                            }]
                                        }]
                                    }
                                }]
                            }],
                            body: {
                                type: 'BlockStatement',
                                start: 28,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                body: []
                            }
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('function f1({a} = {a:1}, b, [c] = [2]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f1({a} = {a:1}, b, [c] = [2]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 41,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    },
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        name: 'f1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                            type: 'AssignmentPattern',
                            start: 12,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                start: 12,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 13,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 13,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        name: 'a'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
                                        start: 13,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        name: 'a'
                                    }
                                }]
                            },
                            right: {
                                type: 'ObjectExpression',
                                start: 18,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 19,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 19,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        },
                                        name: 'a'
                                    },
                                    value: {
                                        type: 'Literal',
                                        start: 21,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    },
                                    kind: 'init'
                                }]
                            }
                        },
                        {
                            type: 'Identifier',
                            start: 25,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            name: 'b'
                        },
                        {
                            type: 'AssignmentPattern',
                            start: 28,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            },
                            left: {
                                type: 'ArrayPattern',
                                start: 28,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                elements: [{
                                    type: 'Identifier',
                                    start: 29,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    },
                                    name: 'c'
                                }]
                            },
                            right: {
                                type: 'ArrayExpression',
                                start: 34,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                },
                                elements: [{
                                    type: 'Literal',
                                    start: 35,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    value: 2,
                                    raw: '2'
                                }]
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        start: 39,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 39
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({})(a = b);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({})(a = b);',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    },
                    expression: {
                        type: 'CallExpression',
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
                        callee: {
                            type: 'ObjectExpression',
                            start: 1,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            properties: []
                        },
                        arguments: [{
                            type: 'AssignmentExpression',
                            start: 5,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                name: 'a'
                            },
                            right: {
                                type: 'Identifier',
                                start: 9,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                name: 'b'
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function foo({x}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function foo({x}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        name: 'foo'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 14,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                name: 'x'
                            },
                            kind: 'init',
                            value: {
                                type: 'Identifier',
                                start: 14,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                name: 'x'
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 18,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('try {} catch({}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'try {} catch({}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 19,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
                    }
                },
                body: [{
                    type: 'TryStatement',
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    },
                    block: {
                        type: 'BlockStatement',
                        start: 4,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        },
                        body: []
                    },
                    handler: {
                        type: 'CatchClause',
                        start: 7,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        param: {
                            type: 'ObjectPattern',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            properties: []
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 17,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: []
                        }
                    },
                    finalizer: null
                }],
                sourceType: 'script'
            }
        });

        pass('let {a:b} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'let {a:b} = {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 5,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    name: 'a'
                                },
                                value: {
                                    type: 'Identifier',
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    name: 'b'
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 12,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });
    });
});
