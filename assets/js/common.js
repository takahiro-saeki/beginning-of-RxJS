import Rx from 'rx';

//var btnClicks = Rx.Observable.fromEvent($('#btn'), "click");
const btn = document.getElementById('btn');
const btnClicks = Rx.Observable.fromEvent(btn, 'click')

btnClicks
  .filter(value => value.altKey)
  .subscribe(() => console.log('Altキーを押しながらクリックしたね！'));
