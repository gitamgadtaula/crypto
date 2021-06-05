const ContractABI = 0; // this needs to be the content of ./Contract/megamantokenABI.json 
const ContractAddress = "0x3D86875413a7d2a1fBA4742F7C8f5ac1C19BcD9e"
var walletAddress; // store for the connected wallet address
var walletMegaContent; //store for the current balance of mega held
var contract; // store for the web3 contract object.


async function connectWallet() {
    if(window.ethereum){
        try {
            web3 = new Web3(window.ethereum);
            accounts = await ethereum.enable();
            contract = new web3.eth.Contract(ContractABI,ContractAddress);
            walletAddress = accounts[0];
            //console.log("Web3 connected")
        }catch(e) {
            //console.log(e)
            //could show a modal.
        }
    }else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(ContractABI,ContractAddress);
        walletAddress = accounts[0];
        //console.log("Web3 connected")
    }
    else{
        $("#alertModal").modal("toggle"); // show an alert that there is no web3 enabled browser or extensions.
    }
    // do something with the wallet.
    checkBalance();
}

async function checkBalance() {
    if(web3 !== undefined){

        await contract.methods.balanceOf().call({from: walletAddress}).then(function(v){

            walletMegaContent = v; // quite possibly an object, need to check.
            //call pancakeswap api endpoint
            //calculate price
            //update visuals

        });
    }
}

