import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - In', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Pass', () => {

        const validSyntax = [
            'x in {}',
            'x in __proto',
            '"string" in {}',
            'false in []',
            '!("foo" in {})',
            `MAX_VALUE\u0009in\u0009Number`,
            `MAX_VALUE\u000Bin\u000BNumber`,
            `MAX_VALUE\u0020in\u0020Number`,
            `MAX_VALUE\u000Ain\u000ANumber`,
            `MAX_VALUE\u2028in\u2028Number`,
            `MAX_VALUE\u2029in\u2029Number`,
            `MAX_VALUE\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029in\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number`,

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
