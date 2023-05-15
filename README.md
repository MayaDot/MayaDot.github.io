# GED_blockchain_key_verif

PoC for verifying public key of MetaMask wallet users.

Here's what you need to do to get it to work:
1) Install MetaMask in your browser 
2) Install Ganache (https://trufflesuite.com/ganache/ , use the quickstart option) or connect to a public testnet
3) Connect your MetaMask wallet to your local network on Ganache (https://docs.metamask.io/wallet/get-started/run-development-network/)
4) Install VS Code (should probably work with other setups)
5) Intall nodejs, npm 
6) Install webpack ("npm i --save-dev webpack", "npm i --save-dev webpack-cli")
7) Install http-server (npm install -g http-server)
8) cd simple-dapp
9) run "npx webpack"
10) run "npx http-server"
11) In your browser, go to http://localhost:8080/dist/
12) Open the devtools console in the browser (inspect the webpage and go to the console option)
When you click "Login with MetaMask", your Metamask wallet will pop up and ask you to sign the message generated in the index.html file.


**In production - change the address to the address reported by the user on TurboTax!**