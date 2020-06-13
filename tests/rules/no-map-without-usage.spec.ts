import { stripIndent } from 'common-tags';
import rule, {
  messageId,
  ruleName,
} from '../../src/rules/no-map-without-usage';
import { ruleTester } from '../utils/rule-tester';

ruleTester.run(ruleName, rule, {
  valid: [
    {
      code: `arr.forEach(item => doStuff(item));`,
    },
    {
      code: `const results = arr.map(item => doStuff(item))`,
    },
    {
      code: `
        let results;
        results = arr.map(item => doStuff(item));`,
    },
    {
      code: `
      const obj = {
          key: arr.map(item => doStuff(item))
        };
      `,
    },
    {
      code: `
        arr.map(item => doStuff(item))
          .forEach();
      `,
    },
    {
      code: `
      function myFunction() {
          return arr.map(item => doStuff(item));
      }
      `,
    },
    {
      code: `doStuff(arr.map(item => doStuff(item)))`,
    },
    {
      code: `doOtherStuff(...arr.map(item => doStuff(item)))`,
    },
    {
      code: `b ? arr.map(curr => curr * 2) : [];`,
    },
    {
      code: `b ? [] : arr.map(curr => curr * 2);`,
    },
    {
      code: `const arr2 = [1, arr.map(curr => curr * 2), 3];`,
    },
    {
      code: `arr && arr.map(curr => curr * 2);`,
    },
    {
      code: `b && firstThing() || arr.map(curr => curr * 2);`,
    },
    {
      code: `
      this.getFiles()
        .then(files => files.map(file => path.join(this.basePath, file)))`,
    },
    {
      code: `
      new Map(
          [{ id: 0, name: 'John' }]
              .map<[number, string]>(entity => [entity.id, entity.name])
      );
      `,
    },
    {
      code: `
      class Example {
          items = [1, 2].map(item => doStuff(item));
      }
      `,
    },
    {
      code: `
      import React = require('react');

      export class MyComponent extends React.Component<{}, {}> {
          public render() {
              const arr = [1, 2, 3];
              return (
                  <ul>
                      {arr.map(curr => (
                          <li>{curr}</li>
                      ))}
                  </ul>
              );
          }
      }`,
      filename: 'file.tsx',
    },
  ],
  invalid: [
    {
      code: stripIndent`
this.getFiles()
  .then(files => {
    files.map(file => path.join(this.basePath, file));
  })`,
      errors: [
        {
          messageId,
          line: 3,
          column: 11,
          endLine: 3,
          endColumn: 14,
        },
      ],
    },
    {
      code: `arr.map(item => doStuff(item));`,
      errors: [
        {
          messageId,
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
  ],
});
