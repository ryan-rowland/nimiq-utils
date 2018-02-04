export default class ActivationTools {

    static async fetchBalance(address) {
        const wallet = await Nimiq.Wallet.generate();
        console.log('Nimiq address: ' + wallet.address.toUserFriendlyAddress());
        const ethAddress = await RedeemTools.nim2ethAddress(wallet.address);
        console.log('Ethereum address: ' + ethAddress);

        const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xcfb98637bcae43C13323EAa1731cED2B716962fD&tag=latest&address=${ethAddress}`)
        return response.json();
    }

    static async nim2ethAddress(address) {
        const hash = await Nimiq.Hash.sha256(address.serialize());
        return '0x' + Nimiq.BufferUtils.toHex(hash.subarray(0, 20));
    }

    static async getDashboardData(dashboardToken) {
        const apiRoot = ''
        const request = fetch(
            `${apiRoot}/getDashboardData`,
            {
                method: 'POST',
                body: JSON.stringify({dashboardToken}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        );

        const response = (await request).json();
        this.onDashboardDataResult(response);
    }
}