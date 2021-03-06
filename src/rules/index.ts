import noAccessorRecursion, {
  ruleName as noAccessorRecursionRuleName,
} from './no-accessor-recursion';
import noForeachPush, {
  ruleName as noForeachPushRuleName,
} from './no-foreach-push';
import noMapWithoutUsage, {
  ruleName as noMapWithoutUsageRuleName,
} from './no-map-without-usage';

export const rules = {
  [noAccessorRecursionRuleName]: noAccessorRecursion,
  [noForeachPushRuleName]: noForeachPush,
  [noMapWithoutUsageRuleName]: noMapWithoutUsage,
};
