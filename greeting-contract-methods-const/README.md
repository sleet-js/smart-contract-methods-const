# greeting-contract-methods-const
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
npm i @sleet-js/greeting-contract-methods-const
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

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

copyright 2025 by sleet.near