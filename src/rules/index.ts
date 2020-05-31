import noAccessorRecursion, { ruleName as noAccessorRecursionRuleName } from './no-accessor-recursion';
import noForeachPush, { ruleName as noForeachPushRuleName } from './no-foreach-push';

export const rules = {
    [noAccessorRecursionRuleName]: noAccessorRecursion,
    [noForeachPushRuleName]: noForeachPush,
};
