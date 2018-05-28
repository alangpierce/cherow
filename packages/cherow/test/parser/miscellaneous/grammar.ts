import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

// Cover grammar tests
//
// Covers:
//
// - Destructuring
// - Assignment
// - Binding
// - Parenthesized pattern
// - Invalid syntax

describe('Miscellaneous - Cover grammar', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const invalidAssignments = [
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
    '{ import.meta }',
    '{ x: import.meta }',
    '{ x: import.meta = 1 }',
    '[x--]',
    '[--x = 1]',
    '[x()]',
    '[this]',
    '[this = 1]',
    '[new.target]',
    '[new.target = 1]',
    '[import.meta]',
    '[import.meta = 1]',
    '[super]',
    '[super = 1]',
    '[function f() {}]',
    '[async function f() {}]',
    '[function* f() {}]',
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
    '{ foo: x += x }',

        ];
        for (const arg of invalidAssignments) {

            it(`let x, y, z; (${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`let x, y, z; (${arg}= {});`, undefined, Context.OptionsNext);
                });
            });

            it(`var x, y, z; (${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; (${arg}= {});`, undefined, Context.OptionsNext);
                });
            });

            it(`'use strict'; let x, y, z; for (x in ${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x in ${arg}= {});`, undefined, Context.OptionsNext);
                });
            });

            it(`'use strict'; let x, y, z; for (x of ${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; let x, y, z; for (x of ${arg}= {});`, undefined, Context.OptionsNext);
                });
            });

            it(`var x, y, z; for (x in ${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; for (x in ${arg}= {});`, undefined, Context.OptionsNext);
                });
            });

            it(`var x, y, z; for (x of ${arg}= {});`, () => {
                t.throws(() => {
                    parseSource(`var x, y, z; for (x of ${arg}= {});`, undefined, Context.OptionsNext);
                });
            });
        }
        const programs = [
            'a++',
            '++a',
            'delete a',
            'void a',
            'typeof a',
            '--a',
            '+a',
            '-a',
            '(a = b)++;',
            '(a = b) = c;',
            '~a',
            '!a',
            '{ x : y++ }',
            '[a++]',
            '(x => y)',
            '(async x => y)',
            '((x, z) => y)',
            '(async (x, z) => y)',
            'a[i]', 'a()',
            'a.b',
            'new a',
            'a + a',
            'a - a',
            'a * a',
            'a / a',
            'a == a',
            'a != a',
            'a > a',
            'a < a',
            'a <<< a',
            'a >>> a',
            'function a() {}',
            'function* a() {}',
            'async function a() {}',
            'a`bcd`',
            'this',
            'null',
            'true',
            'false',
            '1',
            '\'abc\'',
            '/abc/',
            '`abc`',
            'class {}',
            '{+2 : x}',
            '{-2 : x}',
            'var',
            '[var]',
            '{x : {y : var}}',
            '{x : x = a+}',
            '{x : x = (a+)}',
            '{x : x += a}',
            '{m() {} = 0}',
            '{[1+1]}',
            '[...rest, x]',
            '[a,b,...rest, x]',
            '[a,,...rest, x]',
            '[...rest,]',
            '[a,b,...rest,]',
            '[a,,...rest,]',
            '[...rest,...rest1]',
            '[a,b,...rest,...rest1]',
            '[a,,..rest,...rest1]',
            '[x, y, ...z = 1]',
            '[...z = 1]',
            '[x, y, ...[z] = [1]]',
            '[...[z] = [1]]',
            '{ x : 3 }',
            '{ x : \'foo\' }',
            '{ x : /foo/ }',
            '{ x : `foo` }',
            '{ get a() {} }',
            '{ set a() {} }',
            '{ method() {} }',
            '{ *method() {} }',
            '...a++',
            '...++a',
            '...typeof a',
            '...[a++]',
            '...(x => y)',
            '{ ...x, }',
            '{ ...x, y }',
            '{ y, ...x, y }',
            '{ ...x, ...y }',
            '{ ...x, ...x }',
            '{ ...x, ...x = {} }',
            '{ ...x, ...x = ...x }',
            '{ ...x, ...x = ...{ x } }',
            '{ ,, ...x }',
            '{ ...get a() {} }',
            '{ ...set a() {} }',
            '{ ...method() {} }',
            '{ ...function() {} }',
            '{ ...*method() {} }',
        ];

        for (const arg of programs) {

            it(`class C { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`function f(${arg}) {}`, undefined, Context.OptionsNext);
                });
            });

            it(`"use strict"; let ${arg} = {};`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; const ${arg} = {};`, undefined, Context.OptionsNext);
                });
            });

            it(`"use strict"; const ${arg} = {};`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; const ${arg} = {};`, undefined, Context.OptionsNext);
                });
            });

            it(`function f(argument1, ${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`function f(argument1, ${arg}) {}`, undefined, Context.OptionsNext);
                });
            });

            it(`var f = (argument1, f(${arg}) {}) => {};`, () => {
                t.throws(() => {
                    parseSource(`var f = (argument1, f(${arg}) {}) => {};`, undefined, Context.OptionsNext);
                });
            });

            it(`try {} catch(${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`try {} catch(${arg}) {}`, undefined, Context.OptionsNext);
                });
            });
        }

        fail('"use strict"; var f = {x} => {};', Context.Empty, {
            source: '"use strict"; var f = {x} => {};',
        });

        fail('"use strict"; var f = {x,y} => {};', Context.Empty, {
            source: '"use strict"; var f = {x,y} => {};',
        });

        fail('function outer() { "use strict"; var f = {x} => {}; }', Context.Empty, {
            source: 'function outer() { "use strict"; var f = {x} => {}; }',
        });

        fail('function outer() { "use strict"; var f = {x,y} => {}; }', Context.Empty, {
            source: 'function outer() { "use strict"; var f = {x,y} => {}; }',
        });

        fail('for (let x = {} in null);', Context.Empty, {
            source: 'for (let x = {} in null);',
        });

        fail('for (let x = {} of null);', Context.Empty, {
            source: 'for (let x = {} of null);',
        });

        fail('var foo = { q } = { x = 10 };', Context.Empty, {
            source: 'var foo = { q } = { x = 10 };',
        });

        fail('var foo; foo = { q } = { x = 10 };', Context.Empty, {
            source: 'var foo; foo = { q } = { x = 10 };',
        });

        fail('var q, x; ({ q } = { x = 10 });', Context.Empty, {
            source: 'var q, x; ({ q } = { x = 10 });',
        });

        fail('var x; [{ x = 10 }]', Context.Empty, {
            source: 'var x; [{ x = 10 }]',
        });

        fail('var x; (true ? { x = true } : { x = false })', Context.Empty, {
            source: 'var x; (true ? { x = true } : { x = false })',
        });

        fail('var q, x; (q, { x = 10 });', Context.Empty, {
            source: 'var q, x; (q, { x = 10 });',
        });

        fail('var { x = 10 } = (o = { x = 20 });', Context.Empty, {
            source: 'var { x = 10 } = (o = { x = 20 });',
        });

        fail('var x; (({ x = 10 } = { x = 20 }) => x)({})', Context.Empty, {
            source: 'var x; (({ x = 10 } = { x = 20 }) => x)({})',
        });

        fail('({ a, b }) = {a: 1, b: 2}', Context.Empty, {
            source: '({ a, b }) = {a: 1, b: 2}',
        });

        fail('({0} = 0)', Context.Empty, {
            source: '({0} = 0)',
        });

        fail('({a.b} = 0)', Context.Empty, {
            source: '({a.b} = 0)',
        });

        fail('({get a(){}})=0', Context.Empty, {
            source: '({get a(){}})=0',
        });

        fail('({a:this}=0)', Context.Empty, {
            source: '({a:this}=0)',
        });

        fail('({a = 0});', Context.Empty, {
            source: '({a = 0});',
        });

        fail('({a} += 0);', Context.Empty, {
            source: '({a} += 0);',
        });

        fail('({ async}) = 0', Context.Empty, {
            source: '({ async}) = 0',
        });

        fail('({a([a.b]){}})', Context.Empty, {
            source: '({a([a.b]){}})',
        });

        fail('({a({e: a.b}){}})', Context.Empty, {
            source: '({a({e: a.b}){}})',
        });

        fail('({set a({e: a.b}){}})', Context.Empty, {
            source: '({set a({e: a.b}){}})',
        });

        fail('({a([a.b]){}})', Context.Empty, {
            source: '({a([a.b]){}})',
        });

        fail('({set a([a.b]){}})', Context.Empty, {
            source: '({set a([a.b]){}})',
        });

        fail('({*a([a.b]){}})', Context.Empty, {
            source: '({*a([a.b]){}})',
        });

        fail('({set a([a.b]){}})', Context.Empty, {
            source: '({set a([a.b]){}})',
        });

        fail('({a}) = 0', Context.Empty, {
            source: '({a}) = 0',
        });

        fail('(x=1)=y', Context.Empty, {
            source: '(x=1)=y',
        });

        fail('([a]) = 0', Context.Empty, {
            source: '([a]) = 0',
        });

        fail('({a}) = 0', Context.Empty, {
            source: '({a}) = 0',
        });

        fail('({Object = 0, String = 0}) = {};', Context.Empty, {
            source: '({Object = 0, String = 0}) = {};',
        });

        fail('{a, b} = {a: 1, b: 2}', Context.Empty, {
            source: '{a, b} = {a: 1, b: 2}',
        });

        fail('({a, b}) = {a: 1, b:2}', Context.Empty, {
            source: '({a, b}) = {a: 1, b:2}',
        });

        fail('({a, b}) = {a: 1, b:2}', Context.Empty, {
            source: '({a, b}) = {a: 1, b:2}',
        });

        fail('({a, b}) = {a: 1, b:2}', Context.Empty, {
            source: '({a, b}) = {a: 1, b:2}',
        });

        fail('{b} = b', Context.Empty, {
            source: '{b} = b',
        });

        fail('({b}) = b;', Context.Empty, {
            source: '({b}) = b;',
        });

        fail('([b]) = b;', Context.Empty, {
            source: '([b]) = b;',
        });

        fail('([{constructor(){}}] = b);', Context.Empty, {
            source: '([{constructor(){}}] = b);',
        });

        fail('[...a, ] = b', Context.Empty, {
            source: '[...a, ] = b',
        });

        fail('obj = {x = 0}', Context.Empty, {
            source: 'obj = {x = 0}',
        });

        fail('f({x = 0})', Context.Empty, {
            source: 'f({x = 0})',
        });

        fail('({ obj:20 }) = 42', Context.Empty, {
            source: '({ obj:20 }) = 42',
        });

        fail('( { get x() {} } = 0)', Context.Empty, {
            source: '( { get x() {} } = 0)',
        });

        fail('({x, y}) = {}', Context.Empty, {
            source: '({x, y}) = {}',
        });

        fail('(1 + 1) = 10', Context.Empty, {
            source: '(1 + 1) = 10',
        });

        fail('(x=1)=2', Context.Empty, {
            source: '(x=1)=2',
        });

        fail('(a = b) = {};', Context.Empty, {
            source: '(a = b) = {};',
        });

        fail('([a]) = []', Context.Empty, {
            source: '([a]) = []',
        });

        fail('({a}) = {}', Context.Empty, {
            source: '({a}) = {}',
        });

        fail('({a}) = 0;', Context.Empty, {
            source: '({a}) = 0;',
        });

        fail('[a, ...(b = c)] = 0', Context.Empty, {
            source: '[a, ...(b = c)] = 0',
        });

        fail('({a:(b = 0)} = 1)', Context.Empty, {
            source: '({a:(b = 0)} = 1)',
        });

        fail('({a}) = 0;', Context.Empty, {
            source: '({a}) = 0;',
        });

        fail('(a, (b)) => 42', Context.Empty, {
         source: '(a, (b)) => 42',
        });

        fail('[...a, ] = c;', Context.Empty, {
          source: '[...a, ] = c;',
        });

        fail('var [a.b] = 0', Context.Empty, {
            source: 'var [a.b] = 0',
        });

        fail('var ([x]) = 0', Context.Empty, {
            source: 'var ([x]) = 0',
        });

        fail('([a.b]) => 0', Context.Empty, {
            source: '([a.b]) => 0',
        });

        fail('function a([a.b]) {}', Context.Empty, {
            source: 'function a([a.b]) {}',
        });

        fail('function* a([a.b]) {}', Context.Empty, {
            source: 'function* a([a.b]) {}',
        });

        fail('function* a({e: a.b}) {}', Context.Empty, {
            source: 'function* a({e: a.b}) {}',
        });

        fail('function* a({e: a.b}) {}', Context.Empty, {
            source: 'function* a({e: a.b}) {}',
        });

        fail('(function* ({e: a.b}) {})', Context.Empty, {
            source: '(function* ({e: a.b}) {})',
        });

        fail('({set a({e: a.b}){}})', Context.Empty, {
            source: '({set a({e: a.b}){}})',
        });

        fail('({0} = 0)', Context.Empty, {
            source: '({0} = 0)',
        });

        fail('{a = [...b, c]} = 0', Context.Empty, {
            source: '{a = [...b, c]} = 0',
        });

        fail('[a, ...b, {c=0}]', Context.Empty, {
            source: '[a, ...b, {c=0}]',
        });

        fail('[0] = 0', Context.Empty, {
            source: '[0] = 0',
        });

        fail('[{a=0},...0]', Context.Empty, {
            source: '[{a=0},...0]',
        });

        fail('[{a=0},{b=0},0] = 0', Context.Empty, {
            source: '[{a=0},{b=0},0] = 0',
        });

        fail('[, x, ...y,] = 0', Context.Empty, {
            source: '[, x, ...y,] = 0',
        });

        fail('var +a = {};', Context.Empty, {
            source: 'var +a = {};',
        });

        fail('var { x : y++ } = {};', Context.Empty, {
            source: 'var { x : y++ } = {};',
        });

        fail('let [a++] = {};', Context.Empty, {
            source: 'let [a++] = {};',
        });

        fail('var (x => y) = {};', Context.Empty, {
            source: 'var (x => y) = {};',
        });

        fail('var a - a = {};', Context.Empty, {
            source: 'var a - a = {};',
        });

        fail('var a < a = {};', Context.Empty, {
            source: 'var a < a = {};',
        });

        fail('var function* a() {} = {};', Context.Empty, {
            source: 'var function* a() {} = {};',
        });

        fail('var a`bcd` = {};', Context.Empty, {
            source: 'var a`bcd` = {};',
        });

        fail('var null = {};', Context.Empty, {
            source: 'var null  = {};',
        });

        fail('var this = {};', Context.Empty, {
            source: 'var this = {};',
        });

        fail('var {+2 : x} = {};', Context.Empty, {
            source: 'var {+2 : x} = {};',
        });

        fail('var [var] = {};', Context.Empty, {
            source: 'var [var] = {};',
        });

        fail('var [...rest,] = {};', Context.Empty, {
            source: 'var [...rest,] = {};',
        });

        fail('var [a,b,...rest,] = {};', Context.Empty, {
            source: 'var [a,b,...rest,] = {};',
        });

        fail('var ...(x => y) = {};', Context.Empty, {
            source: 'var ...(x => y) = {};',
        });

        fail('var f = ( a++ ) => {};', Context.Empty, {
            source: 'var f = ( a++ ) => {};',
        });

        fail('var f = ( a++ ) => {};', Context.Empty, {
            source: 'var f = ( a++ ) => {};',
        });

        fail('var f = ( this ) => {};', Context.Empty, {
            source: 'var f = (this ) => {};',
        });

        fail('var f = ( class {} ) => {};', Context.Empty, {
            source: 'var f = ( class {} ) => {};',
        });

        fail('var f = ( {+2 : x} ) => {};', Context.Empty, {
            source: 'var f = ( {+2 : x} ) => {};',
        });

        fail('var f = ( [a,b,...rest,] ) => {};', Context.Empty, {
            source: 'var f = ( [a,b,...rest,] ) => {};',
        });

        /* fail('var f = ( [...z = 1] ) => {};', Context.Empty, {
            source: 'var f = ([...z = 1] ) => {};',
        });

        fail('var f = ( [x, y, ...z = 1] ) => {};', Context.Empty, {
            source: 'var f = ( [x, y, ...z = 1] ) => {};',
        }); */

        fail('var f = ( [a,,..rest,...rest1] ) => {};', Context.Empty, {
            source: 'var f = ( [a,,..rest,...rest1] ) => {};',
        });

        fail('var f = ( ...typeof a ) => {};', Context.Empty, {
            source: 'var f = ( ...typeof a ) => {};',
        });

        //fail('var f = ( { ...x, ...y } ) => {};', Context.Empty, {
          //source: 'var f = ( { ...x, ...y } ) => {};',
        //});

        //fail('var f = ( { ...x, ...x = {} } ) => {};', Context.Empty, {
//          source: 'var f = ( { ...x, ...x = {} } ) => {};',
  //      });

        fail('var f = ( { ,, ...x } ) => {};', Context.Empty, {
          source: 'var f = ( { ,, ...x } ) => {};',
        });

        fail('var f = ( { ...get a() {} } ) => {};', Context.Empty, {
            source: 'var f = ( { ...get a() {} } ) => {};',
        });

        fail('var f = ( { ...*method() {} } ) => {};', Context.Empty, {
            source: 'var f = ( { ...*method() {} } ) => {};',
        });

        // fail('var f = ( {...{ x = 5 } } ) => {};', Context.Empty, {
        //  source: 'var f = ( {...{ x = 5 } } ) => {};',
        // });

        fail('var f = ( {...x[0] } ) => {};', Context.Empty, {
            source: 'var f = ( {...x[0] } ) => {};',
        });

        fail('var f = ( async function* a() {} ) => {};', Context.Empty, {
            source: 'var f = ( async function* a() {} ) => {};',
        });

        fail('try {} catch(((x, z) => y)) {}', Context.Empty, {
            source: 'try {} catch(((x, z) => y)) {}',
        });

        fail('try {} catch(a <<< a) {}', Context.Empty, {
            source: 'try {} catch(a <<< a) {}',
        });

        fail('try {} catch(function* a() {}) {}', Context.Empty, {
            source: 'try {} catch(function* a() {}) {}',
        });

        fail('try {} catch(this) {}', Context.Empty, {
            source: 'try {} catch(this) {}',
        });

        fail('var f = (argument1, (async x => y)) => {};', Context.Empty, {
            source: 'var f = (argument1, (async x => y)) => {};',
        });

        fail('var f = (argument1, (async x => y)) => {};', Context.Empty, {
            source: 'var f = (argument1, (async x => y)) => {};',
        });

        fail('var f = (argument1,(async (x, z) => y)) => {};', Context.Empty, {
            source: 'var f = (argument1, (async (x, z) => y)) => {};',
        });

        fail('var f = (argument1, a - a) => {};', Context.Empty, {
            source: 'var f = (argument1, a - a) => {};',
        });

        fail('var f = (argument1, a >>> a) => {};', Context.Empty, {
            source: 'var f = (argument1, a >>> a) => {};',
        });

        fail('var f = (argument1, {x : {y : var}}) => {};', Context.Empty, {
          source: 'var f = (argument1, {x : {y : var}}) => {};',
         });

        fail('var f = (argument1, {[1+1]}) => {};', Context.Empty, {
            source: 'var f = (argument1, {[1+1]}) => {};',
        });

        //fail('var f = (argument1, [x, y, ...[z] = [1]]) => {};', Context.Empty, {
        //  source: 'var f = (argument1, [x, y, ...[z] = [1]]) => {};',
        //});

        fail('var f = (argument1, (async x => y)) => {};', Context.Empty, {
            source: 'var f = (argument1, (async x => y)) => {};',
        });

        fail('var f = (argument1, { x : "foo" }) => {};', Context.Empty, {
            source: 'var f = (argument1, { x : "foo" }) => {};',
        });

        fail('var f = (argument1, { *method() {} }) => {};', Context.Empty, {
            source: 'var f = (argument1, { *method() {} }) => {};',
        });

        //fail('var f = (argument1, { ...x, ...y }) => {};', Context.Empty, {
        //  source: 'var f = (argument1, { ...x, ...y }) => {};',
        //});

        fail('var f = (argument1, { ...set a() {} }) => {};', Context.Empty, {
            source: 'var f = (argument1, { ...set a() {} }) => {};',
        });

        // fail('var f = (argument1, {...{x} }) => {};', Context.Empty, {
        //  source: 'var f = (argument1, {...{x} }) => {};',
        // });

        fail('var f = (argument1, {...x.f }) => {};', Context.Empty, {
            source: 'var f = (argument1, {...x.f }) => {};',
        });

        // fail('var f = (argument1, {...[ x = 5 ] }) => {};', Context.Empty, {
        // source: 'var f = (argument1, {...[ x = 5 ] }) => {};',
        // });

        fail('function f( a`bcd` ) {}', Context.Empty, {
            source: 'function f( a`bcd` ) {}',
        });

        fail('function f( {x : {y : var}} ) {}', Context.Empty, {
            source: 'function f( {x : {y : var}} ) {}',
        });

        fail('function f( {x : x = a+} ) {}', Context.Empty, {
            source: 'function f( {x : x = a+} ) {}',
        });

        fail('function f( [a,,...rest,] ) {}', Context.Empty, {
            source: 'function f( [a,,...rest,] ) {}',
        });

        fail('function f( [x, y, ...[z] = [1]] ) {}', Context.Empty, {
            source: 'function f( [x, y, ...[z] = [1]] ) {}',
        });

        fail('function f( { get a() {} } ) {}', Context.Empty, {
            source: 'function f( { get a() {} } ) {}',
        });

        fail('function f( { ...x, ...y } ) {}', Context.Empty, {
            source: 'function f({ ...x, ...y } ) {}',
        });

        fail('function f({ ...x, ...x = {} }) {}', Context.Empty, {
            source: 'function f( { ...x, ...x = {} }) {}',
        });

        fail('function f( { ...function() {} } ) {}', Context.Empty, {
            source: 'function f( { ...function() {} } ) {}',
        });

        fail('function f( async function* a() {} ) {}', Context.Empty, {
            source: 'function f( async function* a() {} ) {}',
        });

        fail('function f( { y, ...x, y } ) {}', Context.Empty, {
            source: 'function f( { y, ...x, y } ) {}',
        });

        fail('function f( [...rest,...rest1] ) {}', Context.Empty, {
            source: 'function f( [...rest,...rest1] ) {}',
        });

        fail('function f( {[1+1]} ) {}', Context.Empty, {
            source: 'function f( {[1+1]} ) {}',
        });

        fail('function f( {m() {} = 0} ) {}', Context.Empty, {
            source: 'function f( {m() {} = 0} ) {}',
        });

        fail('function f( {x : x = (a+)} ) {}', Context.Empty, {
            source: 'function f( {x : x = (a+)} ) {}',
        });

        fail('function f( argument1, {x : x = (a+)} ) {}', Context.Empty, {
            source: 'function f( argument1, {x : x = (a+)} ) {}',
        });

        fail('function f( argument1, [a,,...rest, x]) {}', Context.Empty, {
            source: 'function f( argument1, [a,,...rest, x]) {}',
        });

        fail('function f( argument1, this ) {}', Context.Empty, {
            source: 'function f( argument1, this ) {}',
        });

        fail('function f( argument1, null ) {}', Context.Empty, {
            source: 'function f( argument1, null ) {}',
        });

        fail('function f( argument1, a.b ) {}', Context.Empty, {
            source: 'function f( argument1, a.b ) {}',
        });

        fail('{...a, ...b, ...c} = {...a, ...b, ...c}', Context.Empty, {
            source: '{...a, ...b, ...c} = {...a, ...b, ...c}',
        });

        fail('a = {...a, ...b, ...c}', Context.Empty, {
            source: 'a = {..., ...b}',
        });

        fail('[...a, ...b, ...c] = [...a, ...b, ...c]', Context.Empty, {
            source: '[...a, ...b, ...c] = [...a, ...b, ...c]',
        });

        fail('a = [...a, ...b, ...c]', Context.Empty, {
            source: 'a = [..., ...b]',
        });
    });

    describe('Pass', () => {

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
            body: [
              {
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
                  elements: [
                    {
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
              }
            ],
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
            body: [
              {
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
                  elements: [
                    {
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
                    }
                  ]
                }
              }
            ],
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
            body: [
              {
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
                  elements: [
                    {
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
                          elements: [
                            {
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
                            }
                          ]
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
                          elements: [
                            {
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
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
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
            body: [
              {
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
                  elements: [
                    {
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
                          elements: [
                            {
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
                            }
                          ]
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
                          elements: [
                            {
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
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass('(a.b) = 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a.b) = 0',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                        type: 'MemberExpression',
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
                        object: {
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
                        property: {
                          type: 'Identifier',
                          start: 3,
                          end: 4,
                          loc: {
                            start: {
                              line: 1,
                              column: 3
                            },
                            end: {
                              line: 1,
                              column: 4
                            }
                          },
                          name: 'b'
                        },
                        computed: false
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
                        value: 0,
                        raw: '0'
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('a0({});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'a0({});',
            expected: {
                type: 'Program',
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    },
                    expression: {
                      type: 'CallExpression',
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
                      callee: {
                        type: 'Identifier',
                        start: 0,
                        end: 2,
                        loc: {
                          start: {
                            line: 1,
                            column: 0
                          },
                          end: {
                            line: 1,
                            column: 2
                          }
                        },
                        name: 'a0'
                      },
                      arguments: [
                        {
                          type: 'ObjectExpression',
                          start: 3,
                          end: 5,
                          loc: {
                            start: {
                              line: 1,
                              column: 3
                            },
                            end: {
                              line: 1,
                              column: 5
                            }
                          },
                          properties: []
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('(a) = 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a) = 0',
            expected: {
                type: 'Program',
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    },
                    expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      operator: '=',
                      left: {
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
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('(a) = 2;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a) = 2;',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      operator: '=',
                      left: {
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
                        value: 2,
                        raw: '2'
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('({ a: 1 }).a === 1', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({ a: 1 }).a === 1',
            expected: {
                type: 'Program',
                start: 0,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    expression: {
                      type: 'BinaryExpression',
                      start: 0,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      left: {
                        type: 'MemberExpression',
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
                        object: {
                          type: 'ObjectExpression',
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
                          properties: [
                            {
                              type: 'Property',
                              start: 3,
                              end: 7,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 7
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 3,
                                end: 4,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 3
                                  },
                                  end: {
                                    line: 1,
                                    column: 4
                                  }
                                },
                                name: 'a'
                              },
                              value: {
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
                              },
                              kind: 'init'
                            }
                          ]
                        },
                        property: {
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
                        computed: false
                      },
                      operator: '===',
                      right: {
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
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('({ responseText: text } = res)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({ responseText: text } = res)',
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      },
                      operator: '=',
                      left: {
                        type: 'ObjectPattern',
                        start: 1,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 1
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 3,
                            end: 21,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 21
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 3,
                              end: 15,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 15
                                }
                              },
                              name: 'responseText'
                            },
                            value: {
                              type: 'Identifier',
                              start: 17,
                              end: 21,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 21
                                }
                              },
                              name: 'text'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      right: {
                        type: 'Identifier',
                        start: 26,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        },
                        name: 'res'
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass('(({a = {b} = {b: 42}}) => a.b)({})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(({a = {b} = {b: 42}}) => a.b)({})',
            expected: {
                type: 'Program',
                start: 0,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    },
                    expression: {
                        type: 'CallExpression',
                        start: 0,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        },
                        callee: {
                            type: 'ArrowFunctionExpression',
                            start: 1,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'ObjectPattern',
                                start: 2,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 3,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
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
                                        start: 3,
                                        end: 4,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 4
                                            }
                                        },
                                        name: 'a'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 3,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 3,
                                            end: 4,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 3
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 4
                                                }
                                            },
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'AssignmentExpression',
                                            start: 7,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 7
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            },
                                            operator: '=',
                                            left: {
                                                type: 'ObjectPattern',
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
                                                properties: [{
                                                    type: 'Property',
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
                                                        name: 'b'
                                                    },
                                                    kind: 'init',
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
                                                        name: 'b'
                                                    }
                                                }]
                                            },
                                            right: {
                                                type: 'ObjectExpression',
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
                                                properties: [{
                                                    type: 'Property',
                                                    start: 14,
                                                    end: 19,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 19
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
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
                                                        name: 'b'
                                                    },
                                                    value: {
                                                        type: 'Literal',
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
                                                        value: 42,
                                                        raw: '42'
                                                    },
                                                    kind: 'init'
                                                }]
                                            }
                                        }
                                    }
                                }]
                            }],
                            body: {
                                type: 'MemberExpression',
                                start: 26,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                object: {
                                    type: 'Identifier',
                                    start: 26,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    name: 'a'
                                },
                                property: {
                                    type: 'Identifier',
                                    start: 28,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    name: 'b'
                                },
                                computed: false
                            }
                        },
                        arguments: [{
                            type: 'ObjectExpression',
                            start: 31,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 31
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            properties: []
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

    pass('var { x : y } = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { x : y } = {};',
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'ObjectPattern',
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
                                    name: 'x'
                                },
                                value: {
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
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var { x : y = 1 } = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { x : y = 1 } = {};',
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
                            type: 'ObjectPattern',
                            start: 4,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            properties: [{
                                type: 'Property',
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
                                    name: 'x'
                                },
                                value: {
                                    type: 'AssignmentPattern',
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
                                        name: 'y'
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
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
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
                            properties: []
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var { get, set } = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { get, set } = {};',
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'get'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
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
                                        name: 'get'
                                    }
                                },
                                {
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'set'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
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
                                        name: 'set'
                                    }
                                }
                            ]
                        },
                        init: {
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
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('{ get = 1, set = 2 }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '{ get = 1, set = 2 }',
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
                    type: 'BlockStatement',
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
                        start: 2,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        },
                        expression: {
                            type: 'SequenceExpression',
                            start: 2,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            expressions: [{
                                    type: 'AssignmentExpression',
                                    start: 2,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        start: 2,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        },
                                        name: 'get'
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
                                },
                                {
                                    type: 'AssignmentExpression',
                                    start: 11,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
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
                                        name: 'set'
                                    },
                                    right: {
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
                                        value: 2,
                                        raw: '2'
                                    }
                                }
                            ]
                        }
                    }]
                }],
                sourceType: 'script'
            }
        });

    pass('var [a] = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [a] = {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 13,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        id: {
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
                                name: 'a'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 10,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
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
                            type: 'ArrayPattern',
                            start: 4,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            },
                            elements: [{
                                    type: 'ObjectPattern',
                                    start: 5,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 6,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
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
                                                name: 'x'
                                            },
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
                                                    name: 'x'
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
                                                    value: 1,
                                                    raw: '1'
                                                }
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
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
                                            method: false,
                                            shorthand: false,
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
                                                name: 'y'
                                            },
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
                                                    name: 'y'
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
                                                    value: 2,
                                                    raw: '2'
                                                }
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                },
                                {
                                    type: 'ArrayPattern',
                                    start: 25,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    },
                                    elements: [{
                                            type: 'AssignmentPattern',
                                            start: 26,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 26,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Literal',
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
                                                value: 3,
                                                raw: '3'
                                            }
                                        },
                                        {
                                            type: 'AssignmentPattern',
                                            start: 33,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 33,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                },
                                                name: 'b'
                                            },
                                            right: {
                                                type: 'Literal',
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
                                                value: 4,
                                                raw: '4'
                                            }
                                        },
                                        {
                                            type: 'AssignmentPattern',
                                            start: 40,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            },
                                            left: {
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
                                                name: 'c'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 44,
                                                end: 45,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 44
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 45
                                                    }
                                                },
                                                value: 5,
                                                raw: '5'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 50,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 50
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var {[1+1] : z} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {[1+1] : z} = {};',
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
                            type: 'ObjectPattern',
                            start: 4,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 15
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
                                computed: true,
                                key: {
                                    type: 'BinaryExpression',
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
                                    left: {
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
                                    },
                                    operator: '+',
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
                                },
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
                                    name: 'z'
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
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
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var { __proto__: x, __proto__: y} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { __proto__: x, __proto__: y} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 36,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 36
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 6,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 20,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 20,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
                        start: 4,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                }],
                start: 0,
                end: 39,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 39
                    }
                }
            }
        });

    pass('var { x : x, y : y, ...z } = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { x : x, y : y, ...z } = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 29,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
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
                                    }
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 13,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'z',
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
                                        }
                                    },
                                    start: 20,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        start: 4,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }],
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                }
            }
        });

    pass('var [{x:x, y:y, ...z}, [a,b,c]] = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [{x:x, y:y, ...z}, [a,b,c]] = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
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
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            elements: [{
                                    type: 'ObjectPattern',
                                    properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                }
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
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
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                                }
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
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
                                            }
                                        },
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'z',
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
                                                }
                                            },
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
                                            }
                                        }
                                    ],
                                    start: 5,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                {
                                    type: 'ArrayPattern',
                                    elements: [{
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 26,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        start: 4,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                }],
                start: 0,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                }
            }
        });

    pass('var {x, ...y} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {x, ...y} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
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
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    start: 8,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                }
                            ],
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
                            }
                        },
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
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    pass('var {[x] : z, ...y} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {[x] : z, ...y} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
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
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    computed: true,
                                    value: {
                                        type: 'Identifier',
                                        name: 'z',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
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
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    start: 14,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
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
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    pass('var {[1+1] : z, ...x} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {[1+1] : z, ...x} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 24,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        operator: '+',
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
                                        }
                                    },
                                    computed: true,
                                    value: {
                                        type: 'Identifier',
                                        name: 'z',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
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
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
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
                                    }
                                }
                            ],
                            start: 4,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        start: 4,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    pass('var {arguments: x, ...z} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {arguments: x, ...z} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
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
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'arguments',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 5,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'z',
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
                                    },
                                    start: 19,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                }
                            ],
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
                            }
                        },
                        start: 4,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    pass('function f( { __proto__: x, __proto__: y, ...z} ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f( { __proto__: x, __proto__: y, ...z} ) {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
                                type: 'Property',
                                kind: 'init',
                                key: {
                                    type: 'Identifier',
                                    name: '__proto__',
                                    start: 14,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                computed: false,
                                value: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                },
                                method: false,
                                shorthand: false,
                                start: 14,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                kind: 'init',
                                key: {
                                    type: 'Identifier',
                                    name: '__proto__',
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
                                    }
                                },
                                computed: false,
                                value: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 39,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    }
                                },
                                method: false,
                                shorthand: false,
                                start: 28,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            },
                            {
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'z',
                                    start: 45,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 45
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 42,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 42
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 12,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 47
                            }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 50,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 50
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                        }
                    },
                    start: 0,
                    end: 52,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 52
                        }
                    }
                }],
                start: 0,
                end: 52,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 52
                    }
                }
            }
        });

    pass('function f( {eval: x} ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f( {eval: x} ) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
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
                        start: 12,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
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
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 13,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                },
                                name: 'eval'
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
                                name: 'x'
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 24,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 24
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

    pass('function f( {var: x = 42} ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f( {var: x = 42} ) {}',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        start: 12,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 13,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
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
                                name: 'var'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
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
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
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
                }],
                sourceType: 'script'
            }
        });

    pass('function f( {"isiah" : x = 42} ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f( {"isiah" : x = 42} ) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
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
                        start: 12,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 13,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                                type: 'Literal',
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
                                value: 'isiah',
                                raw: '"isiah"'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 23,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
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
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

    pass('function f( {[foo()] : z} ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f( {[foo()] : z}) {}',
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
                        type: 'ObjectPattern',
                        start: 12,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 13,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                                type: 'CallExpression',
                                start: 14,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
                                    start: 14,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'foo'
                                },
                                arguments: []
                            },
                            value: {
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
                                name: 'z'
                            },
                            kind: 'init'
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

    pass('try {} catch( [a,b,...rest] ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'try {} catch( [a,b,...rest] ) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'TryStatement',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
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
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        },
                        param: {
                            type: 'ArrayPattern',
                            start: 14,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            elements: [{
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
                                {
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
                                    name: 'b'
                                },
                                {
                                    type: 'RestElement',
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
                                    argument: {
                                        type: 'Identifier',
                                        start: 22,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        },
                                        name: 'rest'
                                    }
                                }
                            ]
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 30,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 32
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

    pass('try {} catch( [a = 1] ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'try {} catch( [a = 1] ) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                },
                body: [{
                    type: 'TryStatement',
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
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
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        param: {
                            type: 'ArrayPattern',
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
                            elements: [{
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
                                    value: 1,
                                    raw: '1'
                                }
                            }]
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 24,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 26
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

    pass('try {} catch( [{x:x, y:y}, [a,b,c]] ) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'try {} catch( [{x:x, y:y}, [a,b,c]] ) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 40,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 40
                    }
                },
                body: [{
                    type: 'TryStatement',
                    start: 0,
                    end: 40,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 40
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
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        },
                        param: {
                            type: 'ArrayPattern',
                            start: 14,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            },
                            elements: [{
                                    type: 'ObjectPattern',
                                    start: 15,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
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
                                                name: 'x'
                                            },
                                            value: {
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
                                                name: 'x'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 21,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
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
                                                name: 'y'
                                            },
                                            value: {
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
                                                name: 'y'
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                },
                                {
                                    type: 'ArrayPattern',
                                    start: 27,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    },
                                    elements: [{
                                            type: 'Identifier',
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            name: 'a'
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
                                            name: 'b'
                                        },
                                        {
                                            type: 'Identifier',
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            name: 'c'
                                        }
                                    ]
                                }
                            ]
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 38,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 38
                                },
                                end: {
                                    line: 1,
                                    column: 40
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

    pass('var f = (argument1, [a,b,c]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = (argument1, [a,b,c]) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 34
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
                            name: 'f'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    name: 'argument1'
                                },
                                {
                                    type: 'ArrayPattern',
                                    start: 20,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    elements: [{
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
                                        },
                                        {
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
                                            name: 'b'
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
                                            name: 'c'
                                        }
                                    ]
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 32,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
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

    pass('var f = (argument1, { x : x, y : y = 42 }) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = (argument1, { x : x, y : y = 42 }) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 49,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 49
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 49,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 49
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 48
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
                            name: 'f'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    name: 'argument1'
                                },
                                {
                                    type: 'ObjectPattern',
                                    start: 20,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 22,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
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
                                                name: 'x'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                start: 26,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 29,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
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
                                                name: 'y'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 33,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 33,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    },
                                                    name: 'y'
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    start: 37,
                                                    end: 39,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 39
                                                        }
                                                    },
                                                    value: 42,
                                                    raw: '42'
                                                }
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 46,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 46
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
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

    pass('var f = (argument1, [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = (argument1, [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]]) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 71,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 71
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 71,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 71
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 70,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 70
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
                            name: 'f'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 70,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 70
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    name: 'argument1'
                                },
                                {
                                    type: 'ArrayPattern',
                                    start: 20,
                                    end: 63,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 63
                                        }
                                    },
                                    elements: [{
                                            type: 'ObjectPattern',
                                            start: 21,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            },
                                            properties: [{
                                                    type: 'Property',
                                                    start: 22,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                    computed: false,
                                                    key: {
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
                                                        name: 'x'
                                                    },
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        start: 24,
                                                        end: 29,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 29
                                                            }
                                                        },
                                                        left: {
                                                            type: 'Identifier',
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
                                                            },
                                                            name: 'x'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            start: 28,
                                                            end: 29,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 29
                                                                }
                                                            },
                                                            value: 1,
                                                            raw: '1'
                                                        }
                                                    },
                                                    kind: 'init'
                                                },
                                                {
                                                    type: 'Property',
                                                    start: 31,
                                                    end: 38,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 31
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 38
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                    computed: false,
                                                    key: {
                                                        type: 'Identifier',
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
                                                        name: 'y'
                                                    },
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        start: 33,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 33
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 38
                                                            }
                                                        },
                                                        left: {
                                                            type: 'Identifier',
                                                            start: 33,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 33
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            },
                                                            name: 'y'
                                                        },
                                                        right: {
                                                            type: 'Literal',
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
                                                            value: 2,
                                                            raw: '2'
                                                        }
                                                    },
                                                    kind: 'init'
                                                }
                                            ]
                                        },
                                        {
                                            type: 'ArrayPattern',
                                            start: 41,
                                            end: 62,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 62
                                                }
                                            },
                                            elements: [{
                                                    type: 'AssignmentPattern',
                                                    start: 42,
                                                    end: 47,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 42
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 47
                                                        }
                                                    },
                                                    left: {
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
                                                    right: {
                                                        type: 'Literal',
                                                        start: 46,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        value: 3,
                                                        raw: '3'
                                                    }
                                                },
                                                {
                                                    type: 'AssignmentPattern',
                                                    start: 49,
                                                    end: 54,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 49
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 54
                                                        }
                                                    },
                                                    left: {
                                                        type: 'Identifier',
                                                        start: 49,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 49
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        },
                                                        name: 'b'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        start: 53,
                                                        end: 54,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 53
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 54
                                                            }
                                                        },
                                                        value: 4,
                                                        raw: '4'
                                                    }
                                                },
                                                {
                                                    type: 'AssignmentPattern',
                                                    start: 56,
                                                    end: 61,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 56
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 61
                                                        }
                                                    },
                                                    left: {
                                                        type: 'Identifier',
                                                        start: 56,
                                                        end: 57,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 56
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 57
                                                            }
                                                        },
                                                        name: 'c'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        start: 60,
                                                        end: 61,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 60
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 61
                                                            }
                                                        },
                                                        value: 5,
                                                        raw: '5'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 68,
                                end: 70,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 68
                                    },
                                    end: {
                                        line: 1,
                                        column: 70
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

    pass('var f = (argument1, [a,b,...rest]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = (argument1, [a,b,...rest]) => {};',
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 40
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
                            name: 'f'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    name: 'argument1'
                                },
                                {
                                    type: 'ArrayPattern',
                                    start: 20,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    },
                                    elements: [{
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
                                        },
                                        {
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
                                            name: 'b'
                                        },
                                        {
                                            type: 'RestElement',
                                            start: 25,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            },
                                            argument: {
                                                type: 'Identifier',
                                                start: 28,
                                                end: 32,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32
                                                    }
                                                },
                                                name: 'rest'
                                            }
                                        }
                                    ]
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 38,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 38
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
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

    pass('var f = (argument1, {x = 42, y = 15, ...z}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = (argument1, {x = 42, y = 15, ...z}) => {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 47,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            },
                            params: [{
                                    type: 'Identifier',
                                    name: 'argument1',
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                {
                                    type: 'ObjectPattern',
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                }
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 42,
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
                                                    raw: '42'
                                                },
                                                start: 21,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 21,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                                }
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'y',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 15,
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
                                                    raw: '15'
                                                },
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
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
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
                                            }
                                        },
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'z',
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
                                                }
                                            },
                                            start: 37,
                                            end: 41,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 8,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
                        start: 4,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 50,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 50
                        }
                    }
                }],
                start: 0,
                end: 50,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 50
                    }
                }
            }
        });
/*
        pass('"use strict"; let {arguments: x} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"use strict"; let {arguments: x} = {};',
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "use strict",
                            "start": 0,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "raw": "\"use strict\""
                        },
                        "directive": "use strict",
                        "start": 0,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "ObjectExpression",
                                    "properties": [],
                                    "start": 35,
                                    "end": 37,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 37
                                        }
                                    }
                                },
                                "id": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "arguments",
                                                "start": 19,
                                                "end": 28,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 28
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 30,
                                                "end": 31,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 30
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 31
                                                    }
                                                }
                                            },
                                            "method": false,
                                            "shorthand": false,
                                            "start": 19,
                                            "end": 31,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "start": 18,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "start": 18,
                                "end": 37,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 37
                                    }
                                }
                            }
                        ],
                        "kind": "let",
                        "start": 14,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 38,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 38
                    }
                }
            }
        });*/

    pass('"use strict"; let {"hi" : x} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"use strict"; let {"hi" : x} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
                                    start: 31,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'hi',
                                                start: 19,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                },
                                                raw: '"hi"'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'x',
                                                start: 26,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 19,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        }
                                    ],
                                    start: 18,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                start: 18,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 14,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    }
                ],
                start: 0,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                }
            }
        });

    pass('"use strict"; let {42 : x} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"use strict"; let {42 : x} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
                                    start: 29,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 42,
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
                                                raw: '42'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                            },
                                            method: false,
                                            shorthand: false,
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
                                            }
                                        }
                                    ],
                                    start: 18,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                start: 18,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 14,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    }
                ],
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                }
            }
        });

    pass('"use strict"; let [a,,...rest] = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"use strict"; let [a,,...rest] = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                    }
                                },
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        null,
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'rest',
                                                start: 25,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                }
                                            },
                                            start: 22,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        }
                                    ],
                                    start: 18,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                start: 18,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 14,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    }
                ],
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
                }
            }
        });

    pass('"use strict"; let {var: x = 42} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"use strict"; let {var: x = 42} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                    }
                                },
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'var',
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
                                                }
                                            },
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 42,
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
                                                    raw: '42'
                                                },
                                                start: 24,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 19,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        }
                                    ],
                                    start: 18,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                start: 18,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 14,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 37
                            }
                        }
                    }
                ],
                start: 0,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                }
            }
        });

    pass('var f = ( {[x] : z} ) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var f = ( {[x] : z} ) => {};',
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
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
                            name: 'f'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                type: 'ObjectPattern',
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
                                properties: [{
                                    type: 'Property',
                                    start: 11,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: true,
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
                                        name: 'x'
                                    },
                                    value: {
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
                                        name: 'z'
                                    },
                                    kind: 'init'
                                }]
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
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('function f(argument1, [...rest]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f(argument1, [...rest]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
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
                            type: 'Identifier',
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
                            name: 'argument1'
                        },
                        {
                            type: 'ArrayPattern',
                            start: 22,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            elements: [{
                                type: 'RestElement',
                                start: 23,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 26,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    },
                                    name: 'rest'
                                }
                            }]
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
                }],
                sourceType: 'script'
            }
        });

    pass('function f(argument1, { x : y = 1, ...z }) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f(argument1, { x : y = 1, ...z }) {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                            type: 'Identifier',
                            name: 'argument1',
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
                            }
                        },
                        {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    },
                                    computed: false,
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            raw: '1'
                                        },
                                        start: 28,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 24,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'z',
                                        start: 38,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    start: 35,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 43,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 43
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                        }
                    },
                    start: 0,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                }],
                start: 0,
                end: 45,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 45
                    }
                }
            }
        });

    pass('function f(argument1, { x : x, y : y = 42, ...z }) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function f(argument1, { x : x, y : y = 42, ...z }) {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                            type: 'Identifier',
                            name: 'argument1',
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
                            }
                        },
                        {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 28,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 24,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 42,
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
                                            raw: '42'
                                        },
                                        start: 35,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 31,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'z',
                                        start: 46,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    },
                                    start: 43,
                                    end: 47,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 47
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 51,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 51
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

    pass('var {arguments} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {arguments} = {};',
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
                            type: 'ObjectPattern',
                            start: 4,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 15
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
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    name: 'arguments'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
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
                                    name: 'arguments'
                                }
                            }]
                        },
                        init: {
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
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var {x: arguments} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {x: arguments} = {};',
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
                                start: 5,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
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
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'arguments'
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 21,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

    pass('var {...arguments} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {...arguments} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 21,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 8,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                start: 5,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }],
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
                            }
                        },
                        start: 4,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    pass('var {arguments = false} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {arguments = false} = {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
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
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                kind: 'init',
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
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
                                    }
                                },
                                computed: false,
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'arguments',
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
                                        }
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: false,
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
                                        raw: 'false'
                                    },
                                    start: 5,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                method: false,
                                shorthand: true,
                                start: 5,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }],
                            start: 4,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 4,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    }],
                    kind: 'var',
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
                    }
                }],
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
                }
            }
        });

    });
});
