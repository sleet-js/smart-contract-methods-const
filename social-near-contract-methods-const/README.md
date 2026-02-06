# social-near-contract-methods-const
const's for a simple near greeting smart contract methods


ℹ️ can be used with any near api js option.


---


### DEV
to devlop and publish this package
```bash
bun install
bun run index.ts
bun build index.ts
bun publish --dry-run
bunx npm login
bun publish --access public
```

---

### HOW TO USE

add
```sh
npm i @sleet-js/social-near-contract-methods-const
bun add @sleet-js/greeting-contract-methods-const
```

import
```js
import { greeting_methods_const } from '@sleet-js/greeting-contract-methods-const';
```

consts
```ts
greeting_methods_const.set_greeting
greeting_methods_const.get_greeting
```


---



copyright 2026 by sleet.near