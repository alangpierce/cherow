import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Computed property names', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const programs = [
            '({[1,2]:3})',
            '({ *a })',
            '({ *a: 0 })',
            '({ *[0]: 0 })',
        ];

        for (const arg of programs) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const programs = [
            '({"oink"(that, ugly, icefapper) {}})',
            '({"moo"() {}})',
            '({3() {}})',
            '({[6+3]() {}})',
            '({get [6+3]() {}, set [5/4](x) {}})',
            '({[2*308]:0})',
            '({["nUmBeR"+9]:"nein"})',
            '({get __proto__() {}, set __proto__(x) {}})',
            '({set __proto__(x) {}})',
            '({get __proto__() {}})',
            '({__proto__:0})',
            '({set c(x) {}})',
            '({get b() {}})',
            '({2e308:0})',
            '({0x0:0})',

        ];

        for (const arg of programs) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});
