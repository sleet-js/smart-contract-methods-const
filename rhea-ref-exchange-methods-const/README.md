# ref-exchange-methods-const
const's for rhea/ref exchange smart contract

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
npm i @sleet-js/ref-exchange-methods-const
bun add @sleet-js/ref-exchange-methods-const
```

import
```js
import { ref_exchange_methods_const, ref_mainnet_contractId_const } from '@sleet-js/ref-exchange-methods-const';
```

common methods - example with near api js
```js
// GET NUMBER OF POOLS
const result = await MY_BACKEND_NEARAPI_JsonRpcProvider_const.callFunction(
  ref_mainnet_contractId_const,
  ref_exchange_methods_const.get_number_of_pools,
  {},
);

// GET SHIT BUY QUOTE
const WNEAR_IN_SHIT_OUT_RESULT = await MY_BACKEND_NEARAPI_JsonRpcProvider_const.callFunction(
  ref_mainnet_contractId_const,
  ref_exchange_methods_const.get_return,
  {"pool_id": 5767, "token_in": "wrap.near", "amount_in": "1000000000000000000000000", "token_out": "shit-1170.meme-cooking.near"},
);
```

package exports
- ref_exchange_methods_const (all the methods)
- ref_mainnet_contractId_const (v2.ref-finance.near)
- ref_testnet_contractId_const (ref-finance-101.testnet)


---

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

copyright 2025 by sleet.near