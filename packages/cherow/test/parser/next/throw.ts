import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Throw expression', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        fail('(function () { yield throw 10 })', Context.OptionsNext | Context.Strict | Context.Module, {
            source: '(function () { yield throw 10 })',
        });
        fail('(function () { yield throw 10 })', Context.OptionsNext, {
            source: '(function () { yield throw 10 })',
        });

        fail('(async function () { yield throw 10 })', Context.OptionsNext, {
            source: '(async function () { yield throw 10 })',
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            'function test() { (throw 1, 2); }',
            'var __throw = (this && this.__throw) || function (e) { throw e; };',
            'function c(d = throw new TypeError()) { }',
            'const a = condition ? 1 : throw new Error();',
            'const w = condition ? throw true ? x : y : z;',
            'function test() {  (throw 1); }',
            'function test() { true && throw 1; }',
            'function test() { throw 1; }',
            'const b = condition || throw new Error();',
            '(function *() { yield throw 10 })',
            'function *foo() { yield throw 10 }',
            '(async function *() { yield throw 10 })',
            'async function *foo() { yield throw "icefapper"; }',
            'function save(filename = throw new TypeError("Argument required")) { }',
            `class Product {
                get id() { return this._id; }
                set id(value) { this._id = value || throw new Error("Invalid value"); }
              }`
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
    });
});
