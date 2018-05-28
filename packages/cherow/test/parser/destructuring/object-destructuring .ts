import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Destructuring - Object', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            'var {};',
            'let {};',
            'const {};',
            'var {a};',
            'let {a};',
            '({,} = {});',
            'var {,} = {}',
            'var {x:y--} = {};',
            'var {x:y+1} = {};',
            'var y; ({x:y--} = {});',
            'var y; ({x:y+1} = {});',
            'function foo() { return {}; }; let {x:foo()} = {};',
            'function foo() { return {}; }; ({x:foo()} = {});',
            'function foo() { return {}; }; var {x:foo().x} = {};',
            'class foo { method() { let {x:super()} = {}; } }',
            'class foo { method() { ({x:super()} = {}); } }',
            'class foo { method() { var {x:super.x} = {}; } }',
            'let [...[a+1] = [{}];',
            'let a; [...1+a] = [{}];',
            'let a; [...[a+1] = [{}];',
            'let [...[a] = []] = [[]];',
            'let [...{x} = {}] = [{}];',
            'let a; ([...[a] = []] = [[]]);',
            'let x; ([...{x} = {}] = [{}]);',
            'let {foo() {}} = {};',
            'let {get foo() {}} = {};',
            'let {set foo() {}} = {};',
            'let {get [\'foo\']() {}} = {};',
            'let {set [\'foo\'](a) {}} = {};',
            '({foo() {}} = {});',
            '({get foo() {}} = {});',
            '({set foo(a) {}} = {});',
            '({get [\'foo\']() {}} = {});',
            '({set [\'foo\'](a) {}} = {});',
            'var { get foo() { } } = { get: 1 };',
            'var { set bar(x) { } } = { set: 2 };',
            'var a = 1; ({x, y = {a = 1}} = {});',
            'var a = 1; ({x, y = 1, z = 2} = {a = 2});',
            'var a = 1; switch(true) {  case {a = 1} : break; };',
            'let a; ({a:((((a1 = 31))))} = {})',
            'for (let {x} = {} of []) {}',
            'for (let {x} = {} in []) {}',
            'for (var [x] = [] of []) {}',
            'function foo() {for (let {x} = {} of []) {}; }; foo();',
            'let {get foo() {}} = {};',
            'let [...[a+1] = [{}];',
            'let a; [...1+a] = [{}];',
            'let a, r1; ({a:(a1 = r1) = 44} = {})',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            'let a; ({a:((((a1))))} = {a:20})',
            'let a, r1; ({a:a1 = r1 = 44} = {})',
            'let a, r1; ({a:a1 = r1} = {})',
            'var a; [a = class aClass {}] = []',
            'let [...{a}] = [{}];',
            'let a; [...{a}] = [{}];',
            'let a; [...[a = 1]] = [[]];',
            'let obj = {x:1}; [...obj.x] = [10];',
            'let obj = {x:1}; [...obj[\'x\']] = [10];',
            'function foo() { return {x:1}; }; [...foo().x] = [10];',
            'let [...[...[...a]]] = [[[]]];',
            'var foo = \'x\'; var {[bar]:x1} = {}',
            'var foo = \'x\'; var x1; ({[bar]:x1} = {})',
            'var foo = \'x\'; var {[bar + \'foo\']:x1} = {}',
            'var foo = \'x\'; var x1; ({[bar +\'foo\']:x1} = {})',
            'class foo { method() { ({x:super[\'x\']} = {}); } }',
            'function foo() { return {}; }; ({x:foo().x} = {});',
            'function foo() { return {}; }; ({x:foo()[\'x\']} = {});',
            'var z, y; ({x:z = 1, x1:y = 20} = {});',
            'var x, y; ({x, x1:y = 20} = {});',
            'var {x, x1:y = 20} = {};',
            'var {x:z = 1, x1:y = 20} = {};',
            '({x:y} = {});',
            'var {x} = {};',
            'var {x} = {}, {y} = {};',

            // Object destructuring with shorthand initializer
            '({x = 1} = {});',
            '({x, y = 1, z = 2} = {});',
            'var a = 1; ({x = {a = 1} = {}} = {});',
            '[{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
            'var [{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',

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
