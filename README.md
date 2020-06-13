# eslint-plugin-clean-codestyle

## Installation

```
yarn add eslint-plugin-clean-codestyle -D
```

## Rules

| Rule name             | Description                                                                                    | Recommended        |
| --------------------- | ---------------------------------------------------------------------------------------------- | ------------------ |
| no-accessor-recursion | Disallows recursion in accessors                                                               | :heavy_check_mark: |
| no-foreach-push       | Enforce using Array.prototype.map instead of Array.prototype.forEach and Array.prototype.push. | :heavy_check_mark: |
| no-map-without-usage  | Prevents Array.prototype.map from being called and the results not used.                       | :heavy_check_mark: |
