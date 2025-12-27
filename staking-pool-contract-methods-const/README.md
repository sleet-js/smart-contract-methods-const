# staking-pool-contract-methods-const
const's for near staking pools smart contracts methods

ℹ️ can be used with any near api js option.
<br/>
ℹ️ not all staking pool may have the same methods

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
npm i @sleet-js/staking-pool-contract-methods-const
bun add @sleet-js/staking-pool-contract-methods-const
```

This package conatins the consts for these smart contracts
- [x] pool.near - ```factory_pool_methods_const```
- [x] poolv1.near - ```factory_poolv1_methods_const```
- [x] pool ("code_hash": "AjD4YJaXgpiRdiArqnzyDi7Bkr1gJms9Z2w7Ev5esTKB") - ```pool_methods_const```
- [x] poolv1 (J1arLz48fgXcGyCPVckFwLnewNH6j1uw79thsvwqGYTY) - ```poolv1_methods_const```
- [x] meta-pool.near (stnear) - ```meta_pool_methods_const```
- [x] linear-protocol.near (linear) - ```linear_protocol_methods_const```

ℹ️ if i missed a pool, or there is one you would like me to add let me know


---

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

copyright 2025 by sleet.near