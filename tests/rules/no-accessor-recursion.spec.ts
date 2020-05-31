import {stripIndent} from 'common-tags';
import rule, {messageId, ruleName} from '../../src/rules/no-accessor-recursion';
import {ruleTester} from '../utils/rule-tester';

ruleTester.run(ruleName, rule, {
  valid: [
    {
      code: `
        class FooBar {
          get foo() {
            return this._foo;
          }

          set foo(v: string) {
            this._foo = v;
          }

          get baz() {
            return that.baz;
          }

          set baz(v: string) {
            that.baz = v;
          }

          fn() {
            this.foo = this.foo;
            this.bar = this.bar;
            this.baz = this.baz;
            this.bas = this.bas;
          }
        }`,
    },
  ],
  invalid: [
    {
      code: stripIndent`
        class FooBar {
          get bar() {
            return this.bar;
          }

          set bar(v: string) {
            this.bar = v;
          }

          get baz() {
            this.baz++;
            return 1;
          }

          get bat() {
            const tmp = this.bat;
            doStuff(v + tmp);
          }

          get bam() {
            if (condition) {
              return this.bam;
            }
            return this.bar;
          }

          get bas() {
            return (() => this.bas)();
          }

          set bas(v: string) {
            (() => this.bas = v)();
          }
        }`,
      errors: [
        {
          messageId,
          line: 3,
          column: 16,
          endLine: 3,
          endColumn: 24,
          data: {
            kind: 'get',
            methodName: 'bar',
          },
        },
        {
          messageId,
          line: 7,
          column: 9,
          endLine: 7,
          endColumn: 17,
          data: {
            kind: 'set',
            methodName: 'bar',
          },
        },
        {
          messageId,
          line: 11,
          column: 9,
          endLine: 11,
          endColumn: 17,
          data: {
            kind: 'get',
            methodName: 'baz',
          },
        },
        {
          messageId,
          line: 16,
          column: 21,
          endLine: 16,
          endColumn: 29,
          data: {
            kind: 'get',
            methodName: 'bat',
          },
        },
        {
          messageId,
          line: 22,
          column: 20,
          endLine: 22,
          endColumn: 28,
          data: {
            kind: 'get',
            methodName: 'bam',
          },
        },
        {
          messageId,
          line: 28,
          column: 23,
          endLine: 28,
          endColumn: 31,
          data: {
            kind: 'get',
            methodName: 'bas',
          },
        },
        {
          messageId,
          line: 32,
          column: 16,
          endLine: 32,
          endColumn: 24,
          data: {
            kind: 'set',
            methodName: 'bas',
          },
        },
      ],
    },
    {
      code: stripIndent`
        class FooBar {
          get foo() {
            return {
              get bar() {
                class Foo {
                  get foo() {
                    return this.foo;
                  }
                  get bar() {
                    return this.bar;
                  }
                  getBaz() {
                    return this.foo + this.bar;
                  }
                }
                return this.foo;
              }
            }
          }
        }`,
      errors: [
        {
          messageId,
          line: 7,
          column: 32,
          endLine: 7,
          endColumn: 40,
          data: {
            kind: 'get',
            methodName: 'foo',
          },
        },
        {
          messageId,
          line: 10,
          column: 32,
          endLine: 10,
          endColumn: 40,
          data: {
            kind: 'get',
            methodName: 'bar',
          },
        },
      ],
    },
  ],
});
