import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Destructuring - Params', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Pass', () => {

        const invalidSyntax = [
            '{,}',
            '({})',
            '([])',
            '[x}',
            // Object destructuring pattern
            '{x:abc+1}',
            '{x:abc.d}',
            '{x:super}',
            '{x:super()}',
            // Array destructuring pattern
            '[abc.d]',
            '[super]',
            '[super()]',
        ];

        for (const arg of invalidSyntax) {

            // Plain function
            it(`function fn(${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`function fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Generators
            it(`function fn(${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`function *fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Generator expression - no name
            it(`(function *(${arg}) {})`, () => {
                t.throws(() => {
                    parseSource(`(function *(${arg}) {})`, undefined, Context.Empty);
                });
            });
            // Async function
            it(`async function fn(${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`async function fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Async Generator
            it(`async function *fn(${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`async function *fn(${arg}) {}`, undefined, Context.Empty);
                });
            });
            // Arrows
            it(`(${arg}) => x;`, () => {
                t.throws(() => {
                    parseSource(`(${arg}) => x;`, undefined, Context.Empty);
                });
            });

            // Async arrows
            it(`(${arg}) => x;`, () => {
                t.throws(() => {
                    parseSource(`(${arg}) => x;`, undefined, Context.Empty);
                });
            });

        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '{x:x}',
            '{x}',
            '{x:x}, y',
            '[x], y',
            'y, {x:x}',
            'y, [x]',
            '{x:x}, {y:y}, {z:z}',
            '[x], [y], [z]',
            // Two params as object pattern, and each pattern has more than one matching name is valid syntax
            '{x1:x1, x2:x2, x3:x3}, {y1:y1, y1:y2}',
            '[x1, x2, x3], [y1, y2, y3]',
            '{x1:x1}, [y1]',
            'x1, {x2, x3}, [x4, x5], x6',
            '{x1:[y1]}',
            '{}',
            '[,]',
        ];

        for (const arg of validSyntax) {
            // Plain function
            it(`function fn(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Generators
            it(`function fn(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function *fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Generator expression - no name
            it(`(function *(${arg}) {})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(function *(${arg}) {})`, undefined, Context.Empty);
                });
            });
            // Async function
            it(`async function fn(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function fn(${arg}) {}`, undefined, Context.Empty);
                });
            });

            // Async Generator
            it(`async function *fn(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function *fn(${arg}) {}`, undefined, Context.Empty);
                });
            });
            // Arrows
            it(`(${arg}) => x;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg}) => x;`, undefined, Context.Empty);
                });
            });

            // Async arrows
            it(`(${arg}) => x;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg}) => x;`, undefined, Context.Empty);
                });
            });
        }

        const validCombos = [
            'class foo { constructor({x1}){} }',
            'class foo { constructor([x1]){} }',
            'class foo { method({x1}){ }; set prop({x1}){} }',
            'class foo { method([x1]){ }; set prop([x1]){} }',
            'let foo = function ({x1}, [x2]){};',
            '(function({x1}, [x2]){})',
            'let bar = function foo({x1}, [x2]){};',
            'new Function(\'{x}\', \'[y]\', \'return x + y\');',
            'let obj = { foo({x}) {}, set prop([x]) {} }',
            'function foo({x:x = 10}) {}',
            'function foo({x1:x1 = 1}, {y1:y1 = 2}) {}',
            'function foo([x1 = 1], [y1 = 2]) {}',
            'function foo({x1:x1 = 1, x2:x2 = 2, x3:x3 = 3}) {}',
            'function foo([x1 = 1, x2 = 2, x3 = 3]) {}',
            'function foo({x1:x1 = 1}, [y1 = 2]) {}',
            'function foo([x1 = 1], {y1:y1 = 2}) {}',
            'function foo({x:x} = {x:1}) {}',
            'function foo([x] = [1]) {}',
            'function foo({x:x = 1} = {x:2}) {}',
            'function foo([x = 1] = [2]) {}',
            'function foo({x1:[y1 = 1]}) {}',
            'function foo([x1, {y1:y1 = 1}]) {}',
            'function foo({x1:[y1 = 1] = [2]} = {x1:[3]}) {}',
            'function foo([{y1:y1 = 1} = {y1:2}] = [{y1:3}]) {}',
            'function foo([x]) { var x = 10;}',
        ];

        for (const arg of validCombos) {

            // Plain function
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});
