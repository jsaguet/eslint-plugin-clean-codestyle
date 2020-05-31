import {stripIndent} from 'common-tags';
import rule, {messageId, ruleName} from '../../src/rules/no-foreach-push';
import {ruleTester} from '../utils/rule-tester';

ruleTester.run(ruleName, rule, {
  valid: [
    {
      code: `
        const arr1 = [1,2,3];
        const results = arr1.map(item => item * 2);`,
    },
  ],
  invalid: [
    {
      code: stripIndent`
        const arr1 = [1,2,3];
        const results = [];
        arr1.forEach(item => {
            const newValue = item * 2;
            results.push(newValue);
        });`,
      errors: [
        {
          messageId,
          line: 5,
          column: 13,
          endLine: 5,
          endColumn: 17,
        },
      ],
    },
    {
      code: stripIndent`
        const arr1 = [1,2,3];
        const results = [];
        arr1.forEach(item => {
            if (item === 2) {
                return;
            }
            const newValue = item * 2;
            results.push(newValue);
        });`,
      errors: [
        {
          messageId,
          line: 8,
          column: 13,
          endLine: 8,
          endColumn: 17,
        },
      ],
    },
  ],
});
