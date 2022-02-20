# 👺 Raving Goblins NFT

# 🏃‍♀️ Quick Start
Required: [Git](https://git-scm.com/downloads), [Node](https://nodejs.org/dist/latest-v12.x/), [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Hardhat](https://hardhat.org/getting-started/#installation), [Go](https://go.dev/dl)

> clone/fork 👺 raving-goblins and get setup:

```bash
git clone https://github.com/indavid/raving-goblins.git

cd raving-goblins 

yarn
```

> Download front react package dependencies:

```bash

cd packages/react-app

npm install --save or npm install --save --force ( in case of deps conflict )

```

> Add your wallet private key in a .secret file

```bash

code .secret

```

> Deploy smart contract to selected network (mainnet or rinkeby testnet)

```bash

npx hardhat run ./scripts/deploy.js --network rinkeby ( you can reply the rinkeby testnet by any network you’d like to use=> if needed add more networks to hardhat.config.js file)

```

> Set up Heroku backend API to keep track of NFTs: Create Heruko account, project and DB after logging in (any PAAS is okay)

> Change in MySql file "db, err := sql.Open("mysql",“USERNAME:PWD@tcp(HOST:3306)/DBNAME")" and then save and run build command inside the folder, and then git push it to Heroku

```bash

cd packages/backend/Mysqlcon.go

go build

./gitpush.sh 

```


> Upload all the JSON data to IPFS and store all the CIDs to our API in the Heroku DB (if needed, replace the api endpoint in packages/hardhat/upload.js)
 
```bash

yarn upload

```

> Run the project on localhost:3000

```bash

yarn start

```


📱 Open http://localhost:3000 to see the app
