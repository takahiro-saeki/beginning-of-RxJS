import Rx from 'rx';

class MVVM {
  constructor() {
    this.showView()
  }

  showView() {
    document.body.innerHTML = '<div>テスト</div>'
  }
}

new MVVM()
