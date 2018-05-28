import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Rest spread', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            'a: 1, ...{ get foo() {} }}',
            'return ...[1,2,3];',
            'var ...x = [1,2,3];',
            'var [...x,] = [1,2,3];',
            'var [...x, y] = [1,2,3];',
            'var { x } = {x: ...[1,2,3]}',
        ];
        for (const arg of invalidSyntax) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
                });
            });

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`function fn() {} fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`function fn() { } fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '{a: 1, b: 2, ...undefined}',
            '{a: 1, b: 2, ...null}',
            '{a: 1, b: 2, ...o}',
            '{a: 1, ...null, b: 2, ...undefined, c: 3, ...{}, ...{...{}}, d: 4}',
            '{a: 1, b: 2, ...null}',
            '{...o, c: 4, d: 5, a: 42, ...o}',
            '{...{a: 2, b: 3}, ... {c: 4, d: 5}}',
            '{...null}',
            '{...{b: 2}, a: 3}',
            '{a: 1, b: 7, ...{a: 2, b: 3}}',
            '{set c(v) { icefapper = true; }, ...{c: 1}}',
            '{...{}}',
            '{...{ get z() { calls.push(\'z\') }, get a() { calls.push(\'a\') } }}',
            '{...o[symbol] = 1, c: 4, d: 5}',
            '{...undefined}',
            '{...Symbol(\'foo\'), j: {a: 2, b: 3, c: 4, e: undefined, f: null, g: false}, a: 1, b: 7, d: 5, h: -0, i: Symbol(\'foo\'), j: {a: 2, b: 3, c: 4, e: undefined, f: null, g: false}}',
            '{...{c: 3, d: 4}}',
            '{...{}}',
            '{...{c: 3, d: 4}}',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg})`, undefined, Context.Empty);
                });
            });

        }
    });
});
