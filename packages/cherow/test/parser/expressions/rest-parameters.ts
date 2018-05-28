import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Rest Parameters', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            'function f(a, ...b, c) {}',
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
        // Test 262
        const validSyntax = [
            'function empty(...{}) {}',
            'function emptyWithArray(...{p: []}) {}',
            'function emptyWithObject(...{p: {}}) {}',
            'function emptyWithLeading(x, ...{}) {}',
            'function singleElement(...{a: b}) {}',
            'function singleElementWithInitializer(...{a: b = 0}) {}',
            'function singleElementWithArray(...{p: [a]}) {}',
            'function singleElementWithObject(...{p: {a: b}}) {}',
            'function singleElementWithLeading(x, ...{a: b}) {}',
            'function multiElement(...{a: r, b: s, c: t}) {}',
            'function multiElementWithInitializer(...{a: r = 0, b: s, c: t = 1}) {}',
            'function multiElementWithArray(...{p: [a], b, q: [c]}) {}',
            'function multiElementWithObject(...{a: {p: q}, b: {r}, c: {s = 0}}) {}',
            'function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}',
            'function empty(...[]) {}',
            'function emptyWithArray(...[[]]) {}',
            'function emptyWithObject(...[{}]) {}',
            'function emptyWithRest(...[...[]]) {}',
            'function emptyWithLeading(x, ...[]) {}',
            'function singleElement(...[a]) {}',
            'function singleElementWithInitializer(...[a = 0]) {}',
            'function singleElementWithArray(...[[a]]) {}',
            'function singleElementWithObject(...[{p: q}]) {}',
            'function singleElementWithRest(...[...a]) {}',
            'function singleElementWithLeading(x, ...[a]) {}',
            'function multiElement(...[a, b, c]) {}',
            'function multiElementWithInitializer(...[a = 0, b, c = 1]) {}',
            'function multiElementWithArray(...[[a], b, [c]]) {}',
            'function multiElementWithObject(...[{p: q}, {r}, {s = 0}]) {}',
            'function multiElementWithRest(...[a, b, ...c]) {}',
            'function multiElementWithLeading(x, y, ...[a, b, c]) {}',
            'var fn = (a, b, ...c) => c;',
            'function af(...a) {}',
            'function bf(a, ...b) {}'
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
