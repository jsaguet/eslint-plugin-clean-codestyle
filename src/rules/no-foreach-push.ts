import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

export const ruleName = 'no-foreach-push';

export const messageId = 'noForEachPush';
export type MessageIds = typeof messageId;

type Options = [];

const rule: TSESLint.RuleModule<MessageIds, Options> = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce using Array.prototype.map instead of Array.prototype.forEach and Array.prototype.push.',
      category: 'Possible Errors',
      recommended: 'error',
      url: '',
    },
    messages: {
      [messageId]:
        'Do not use Array.prototype.push inside of Array.prototype.forEach. Use Array.prototype.map instead to replace both.',
    },
    schema: [],
  },
  create: (
    context: TSESLint.RuleContext<MessageIds, Options>,
  ): TSESLint.RuleListener => {
    return {
      "CallExpression[callee.property.name='forEach'] MemberExpression > Identifier[name='push']": (
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
