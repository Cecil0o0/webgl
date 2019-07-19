export enum RAF_STATUS {
  READY = 0,
  RUNNING = 1,
  PAUSED = 2,
  RESUME_RUNNING = 3,
  STOPPED = 4,
  ENDED = 5
}

const requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function (callback: FrameRequestCallback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * 高性能动画函数
 * @param executor 每一帧需要执行的函数
 * @param fps 每秒帧数
 */
export function raf(executor: (HRT: DOMHighResTimeStamp) => void, fps: number) {
  let _this = this;
  let fpsInterval: number = 1000 / fps;
  let last: number = Date.now();

  let status: number = RAF_STATUS.READY;
  function animate() {
    let args = arguments;
    let now = Date.now();
    let elapsed = now - last
    if (elapsed > fpsInterval) {
      // 校正当前时间
      // 非常关键，否则帧率很有可能不符合预期
      last = now - (elapsed % fpsInterval)
      executor.apply(_this, args);
    }
    if ([RAF_STATUS.RUNNING, RAF_STATUS.RESUME_RUNNING].includes(status)) {
      requestAnimationFrame(animate);
    }
  }

  return {
    start() {
      status = 1;
      animate()
      return this;
    },
    pause() {
      status = 2
      return this;
    },
    resume() {
      status = 3;
      // 多减个1可以使animate立马执行
      last = Date.now() - fpsInterval - 1
      animate()
      return this;
    },
    // 一般来说一定要调用stop，否则就会一直执行animate从而产生无用开销
    stop() {
      status = 4
    }
  }
}
