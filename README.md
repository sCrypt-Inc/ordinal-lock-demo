# ordinals-lock-demo

Install the dependencies

```bash
npm i
```

then update line 1934 of file `node_mudules/scrypt-ts/dist/smart-contract/contract.js`

![](https://aaron67-public.oss-cn-beijing.aliyuncs.com/202310171255810.png)

to the following

```ts
const filteredUtxos = feeUtxos.filter(item => item.satoshis !== 1);
console.log(`filter out utxo: ${feeUtxos.length} => ${filteredUtxos.length}`);
tx.from(filteredUtxos);
```

![](https://aaron67-public.oss-cn-beijing.aliyuncs.com/202310171256295.png)

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

```bash
$ npm start
```
