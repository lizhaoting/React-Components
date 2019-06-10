import util from './util';

function scrollIntoView(elem, _container, config = { }) {
  let container = _container;
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = util.getWindow(container);
  }

  const onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  let alignWithTop = config.alignWithTop;
  const offsetTop = config.offsetTop || 0;
  const offsetBottom = config.offsetBottom || 0;

  const isWin = util.isWindow(container);
  const elemOffset = util.offset(elem);
  const eh = util.outerHeight(elem);
  let containerOffset;
  let ch;
  let containerScroll;
  let diffTop;
  let diffBottom;
  let win;
  let winScroll;
  let wh;

  if (isWin) {
    win = container;
    wh = util.height(win);
    winScroll = {
      top: util.scrollTop(win),
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      top: elemOffset.top - winScroll.top - offsetTop,
    };
    diffBottom = {
      top: elemOffset.top + (eh - (winScroll.top + wh)) + offsetBottom,
    };
    containerScroll = winScroll;
  } else {
    containerOffset = util.offset(container);
    ch = container.clientHeight;
    containerScroll = {
      top: container.scrollTop,
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      top: elemOffset.top - (containerOffset.top +
      (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop,
    };
    diffBottom = {
      top: elemOffset.top +
        (eh -
          (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0))
        ) +
        offsetBottom,
    };
  }
  if (onlyScrollIfNeeded) {
    if (diffTop.top >= 0 && diffTop.top + eh <= ch) { return; }
  }
  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    } else if (diffTop.top < 0) { // 自动调整
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    }
  } else if (!onlyScrollIfNeeded) {
    alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
    if (alignWithTop) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    }
  }
}
export default scrollIntoView;
