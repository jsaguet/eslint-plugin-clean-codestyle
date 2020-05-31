import {TSESTree, TSESLint} from '@typescript-eslint/experimental-utils';

export const ruleName = 'no-foreach-push';

export const messageId = 'noForEachPush';

export const rule: TSESLint.RuleModule<any, any> = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using Array.prototype.map instead of Array.prototype.forEach and Array.prototype.push.',
      category: 'Possible Errors',
      recommended: false,
      url: '',
    },
    messages: {
      [messageId]:
        'Do not use Array.prototype.push inside of Array.prototype.forEach. Use Array.prototype.map instead to replace both.',
    },
    schema: [],
  },
  create: (context: TSESLint.RuleContext<string, any>): TSESLint.RuleListener => {
    return {
      'CallExpression[callee.property.name=\'forEach\'] MemberExpression > Identifier[name=\'push\']': (
        node: TSESTree.MethodDefinition,
      ): void => {
        context.report({
          node,
          messageId,
        });
      },
    };
  },
};

export default rule;
