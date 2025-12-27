# hos-contracts-methods-const
const's for near house of stake gov smart contracts methods

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
npm i @sleet-js/hos-contracts-methods-const
bun add @sleet-js/hos-contracts-methods-const
```

This package conatins the consts for these smart contracts
- venear-contract (venear.dao) - ```hos_venear_contract_methods_const```
- lockup-contract (differnt for every user) - 
- voting-contract (vote.dao) - ```hos_voting_contract_methods_const```

see the code here: https://github.com/houseofstake/house-of-stake-contracts


---

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

copyright 2025 by sleet.near
