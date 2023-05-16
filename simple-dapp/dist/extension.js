function isMobileDevice() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function openApp() {
    const scheme = 'metamask:';
    const fallbackUrl = isMobileDevice() ? 'https://metamask.app.link/' : 'https://metamask.io/';

    const a = document.createElement('a');
    a.rel = 'noopener noreferrer';
    a.target = 'eth_requestAccounts';//'_blank';
    a.href = scheme;

    setTimeout(() => {
    if (a.href !== document.location.href + '#') {
        a.target = '_self';
        a.href = fallbackUrl;
    }
    }, 5000);

    const e = document.createEvent('MouseEvent');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
}

function web3_check_existing_wallet() {
        const isPhantomInstalled = window?.phantom?.ethereum?.isPhantom;
        const isMobile = isMobileDevice();

        alert(window.ethereum.isMetaMask);

        if (window.phantom | isPhantomInstalled) {
            console.log('Phantom extension has been detected!');
        }
        if (window.ethereum) {
            if (isMobile) {
                console.log('MetaMask mobile app detected!');
                alert('Mobile app detected.')
              } else {
                console.log('MetaMask extension has been detected!');
              }
        }
        if (!window.ethereum & !window.phantom & !isPhantomInstalled){
            openApp();
        }
        return true;
    }

function web3_hash(){
    var hashed_string   = '';
    var chars           = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var total_chars     = chars.length;
    for ( var i = 0; i < 256; i++ ) {
        var randomBuffer = new Uint8Array(1);
        window.crypto.getRandomValues(randomBuffer);
        hashed_string += chars.charAt( Math.floor((randomBuffer[0] / (Math.pow(2,8)-1)) * total_chars));
    }
    return hashed_string;
    }

async function web3_wallet_login() {
    // Check first if the user has a wallet installed
    if ( web3_check_existing_wallet() ) {
        console.log('Initiate Verification Process.');
        alert('Initiate Verification Process.')

        // Get the Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Get Ethereum accounts
        if (isMobileDevice()) {
            try {
              await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
            } catch (error) {
              console.error('User denied account access');
            }
        } else {
            await provider.send('eth_requestAccounts', []);
        }
        console.log("Connected!!");
        // Get the User Ethereum address
        // TODO: In production we should change this to be the address reported by the user in Turbotax!!!!
        const address = await provider.getSigner().getAddress();
        console.log(address);

        // Create hashed string
        const hashed_string = web3_hash();
        const ts = Date.now();
        const message = "Your public key is:\n" + address + " \n\nThe timestamp is: \n" + ts + "\n\nA random string to sign is: \n" + hashed_string
        console.log("Message: " + message);
        // Request the user to sign it
        try {
            const signature = await provider.getSigner().signMessage(message);
            // Got the signature
            console.log("The signature: " + signature);

            const verification = await ethers.utils.verifyMessage(message, signature)

            console.log("Verification: " + verification)

            if (verification == address) {
                // TODO: in production the address should be the address reported in TurboTax
                alert("Verified successfully")

            }
            else {
                alert("Failed to verify")
            }
          } catch (error) {
            console.log(error);
            alert("Sign-in process failed");
          }
        
        
    }
    else {
        console.log('No wallet detected.');
        alert('No wallet detected.');
    }
}