/**
 * 函数节流实现
 * @param  {Function} fn       需要节流执行的函数
 * @param  {[type]}   interval 事件执行间隔时间，单位 ms
 * @return {[type]}            [description]
 */
var throttle = (fn, interval) => {
  var _self = fn,
      timer,
      firstTime = true;

  return function() {
    var args = arguments,
        _me = this;  // 这里代表当前的匿名函数

    if (firstTime) {
      _self.apply(_me, args);
      return firstTime = false;
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
};

export var util = {
  throttle
}