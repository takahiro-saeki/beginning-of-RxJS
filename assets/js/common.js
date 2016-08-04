import Rx from 'rx';

const EventEmitter = require('events').EventEmitter;
const eventListener = new EventEmitter();

const texts = 'ユーザーが打ち込んだマークダウン。\
途中の`syntax-highlight`のように記述された箇所に、\
シンタックスハイライトを`実装`する\n';

function userInputMock(str) {
  if (str.length === 0) {
    return;
  }

  // ユーザーが`interval`変数の間隔でキー入力をしているようなイメージです
  const interval = Math.random() * 50;
  setTimeout(()=> {
    eventListener.emit('input', str[0]);
    userInputMock(str.substr(1));
  }, interval);
}

userInputMock(texts);
module.exports = eventListener;
