import {TSESLint} from '@typescript-eslint/experimental-utils';
import {TSESTree} from '@typescript-eslint/typescript-estree';
import {getPropertyName} from '../utils';

export const ruleName = 'no-accessor-recursion';

export const messageId = 'recursionFailure';

export const rule: TSESLint.RuleModule<any, any> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallows recursion in accessors',
      category: 'Possible Errors',
      recommended: false,
      url: '',
    },
    messages: {
      [messageId]: 'Accessor recursion is not allowed: {{ kind }} {{ methodName }}()',
    },
    schema: [],
  },
  create: (context: TSESLint.RuleContext<string, any>): TSESLint.RuleListener => {
    let accessorName: string = '';
    let kind: string;

    return {
      'MethodDefinition[kind=/get|set/]': (node: TSESTree.MethodDefinition): void => {
        accessorName = getPropertyName(node);
        kind = node.kind;
      },
      'MethodDefinition[kind=/get|set/]:exit': (): void => {
        accessorName = '';
      },
      ['MethodDefinition[kind=/get|set/] MemberExpression[object.type=\'ThisExpression\'] > Identifier']: (
        node: TSESTree.Identifier,
      ): void => {
        if (node.name === accessorName) {
          context.report({
            node: node.parent,
            messageId,
            data: {
              kind,
              methodName: node.name,
            },
          });
        }
      },
    };
  },
};

export default rule;
