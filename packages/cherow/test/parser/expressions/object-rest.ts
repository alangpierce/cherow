import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Object rest', () => {
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
});
