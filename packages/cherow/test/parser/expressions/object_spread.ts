import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Object Spread', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '{ ...var z = y}',
            '{ ...var}',
            '{ ...foo bar}',
            '{* ...foo}',
            '{get ...foo}',
            '{set ...foo}',
            '{async ...foo}',
        ];
        for (const arg of invalidSyntax) {

            it(`x = ${arg}`, () => {
                t.throws(() => {
                    parseSource(`x = ${arg};`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; x = ${arg}`, () => {
                t.throws(() => {
                    parseSource(`x = ${arg};`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '{ ...y }',
            '{ a: 1, ...y }',
            '{ b: 1, ...y }',
            '{ y, ...y}',
            '{ ...z = y}',
            '{ ...y, y }',
            '{ ...y, ...y}',
            '{ a: 1, ...y, b: 1}',
            '{ ...y, b: 1}',
            '{ ...1}',
            '{ ...null}',
            '{ ...undefined}',
            '{ ...1 in {}}',
            '{ ...[]}',
            '{ ...async function() { }}',
            '{ ...async () => { }}',
            '{ ...new Foo()}',
        ];
        for (const arg of validSyntax) {

            it(`x = ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`x = ${arg};`, undefined, Context.Empty);
                });
            });

            it(`x = ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`x = ${arg};`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`"use strict"; x = ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`x = ${arg};`, undefined, Context.Empty);
                });
            });
        }
    });
});
