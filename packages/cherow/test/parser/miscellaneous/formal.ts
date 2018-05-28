import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Formal params', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        const invalidSyntax = [
            '{}',
            '[]',
            '[{}]',
            '{a}',
            'a, {b}',
            'a, b, {c, d, e}',
            'initializer = true',
            'a, b, c = 1',
            '...args',
            'a, b, ...rest',
            '[a, b, ...rest]',
            '{ bindingPattern = {} }',
            '{ initializedBindingPattern } = { initializedBindingPattern: true }',
        ];

        for (const arg of invalidSyntax) {

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`var a = (${arg}) => { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var a = (${arg}) => { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; function f(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; function f(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '{}',
            '[]',
            '[{}]',
            '{a}',
            'a, {b}',
            'a, b, {c, d, e}',
            'initializer = true',
            'a, b, c = 1',
            '...args',
            'a, b, ...rest',
            '[a, b, ...rest]',
            '{ bindingPattern = {} }',
            '{ initializedBindingPattern } = { initializedBindingPattern: true }',
        ];

        for (const arg of validSyntax) {

            it(`var o = { m(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; function f(${arg}) { 'use strict'; }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; function f(${arg}) { 'use strict'; }`, undefined, Context.Empty);
                });
            });
        }
    });
});
