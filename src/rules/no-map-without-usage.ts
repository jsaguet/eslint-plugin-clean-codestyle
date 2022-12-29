import { TSESLint, TSESTree } from '@typescript-eslint/utils';

export const ruleName = 'no-map-without-usage';

export const messageId = 'noMapWithoutUsage';
export type MessageIds = typeof messageId;

type Options = [];

const rule: TSESLint.RuleModule<MessageIds, Options> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prevents Array.prototype.map from being called and the results not used.',
      recommended: 'error',
      url: '',
    },
    messages: {
      [messageId]:
        'Return value from Array.prototype.map should be assigned to a variable. Consider using Array.prototype.forEach instead.',
    },
    schema: [],
  },
  create: (
    context: TSESLint.RuleContext<MessageIds, Options>,
  ): TSESLint.RuleListener => {
    return {
      [`ExpressionStatement > CallExpression[callee.property.name='map'] Identifier[name='map']`]:
        (node: TSESTree.Identifier): void => {
          context.report({
            node: node,
            messageId,
          });
        },
    };
  },
};

export default rule;
