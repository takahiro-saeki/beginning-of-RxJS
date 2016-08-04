import Rx from 'rx';

//var btnClicks = Rx.Observable.fromEvent($('#btn'), "click");
const btn = document.getElementById('btn');
const btnClicks = Rx.Observable.fromEvent(btn, 'click')

btnClicks
  .filter(value => value.altKey)
  .subscribe(() => console.log('Altキーを押しながらクリックしたね！'));

/*
  // `subscribe()`に渡すためのobserverを作成する。
  var observer = Rx.Observer.create(num => {console.log("onNext: " + num)},
      error => {console.log("onError: " + error)},
      () => console.log('onCompleted'));

  Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8])
    .delayWithSelector(num => Rx.Observable.timer(num * 500))
    .filter(num => num % 2)
    .map(num => num * num)
    .subscribe(observer);
*/

var source = Rx.Observable.create(function (observer) {
    // `onNext`を使って、`num`を500ミリ秒ずつobserverにプッシュする
    var num = 0;
    var id = setInterval(function () {
        observer.onNext(num++);
    }, 500);

    setTimeout(function () {
        // 10秒後に、「ストリームが完了した」合図を送る
        observer.onCompleted();
    }, 10000);

    // もちろん、尻ぬぐいの手段を提供しないとダメです
    return function () {
        console.log('disposed');
        clearInterval(id);
    };
});

var subscription = source.subscribe(
    function (x) {
        console.log('onNext: ' + x);
    },
    function (e) {
        console.log('onError: ' + e.message);
    },
    function () {
        console.log('onCompleted');
    });

setTimeout(function () {
    subscription.dispose();
}, 5000);

// => onNext: 0
// => onNext: 1
// => onNext: 2
// => onNext: 3
// => onNext: 4
// => onNext: 5
// => onNext: 6
// => onNext: 7
// => onNext: 8
// => disposed
