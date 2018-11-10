import HashHistory from "../HashHistory/index";

console.log(HashHistory)

let mode = 'h5'; //'hash'; //
let current = null;
switch (mode) {
  case 'hash':
    current = new HashHistory.Hash().listen();
    break;
  case 'h5':
    current = new HashHistory.History().listen();
    break;

  default:
    break;
}

window.hash = current;