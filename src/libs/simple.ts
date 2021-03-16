import store from '@store/index';
import { isMobile, isSmallSize } from '@libs/device';
interface Navs {
  id?: number;
  title?: string;
  pic?: string;
  isShow?: boolean;
}

export const simple = (
  docWidth: number,
  lefts: Array<Navs>,
  rights: Array<Navs>,
  isZoomIn: boolean
) => {
  // 是否显示更多
  if (docWidth <= 1200) {
    rights.some(rNav => {
      if (rNav['id'] === 11 || rNav['id'] === 12) rNav['isShow'] = false;
      if (rNav['id'] === 13) {
        rNav['isShow'] = true;
        return true;
      }
    });
  } else {
    rights.some(rNav => {
      if (rNav['id'] === 11 || rNav['id'] === 12) rNav['isShow'] = true;
      if (rNav['id'] === 13) {
        rNav['isShow'] = false;
        return true;
      }
    });
  }

  // 是否显示自动翻页
  if (docWidth <= 1164) {
    lefts.some(rNav => {
      if (rNav['id'] === 4) {
        rNav['isShow'] = false;
        return true;
      }
    });
  } else {
    lefts.some(rNav => {
      if (rNav['id'] === 4) {
        rNav['isShow'] = true;
        return true;
      }
    });
  }

  // 是否显示缩略图 打开声音
  if (docWidth <= 1128) {
    lefts.some(rNav => {
      if (rNav['id'] === 2) {
        rNav['isShow'] = false;
        return true;
      }
    });
    rights.some(rNav => {
      if (rNav['id'] === 9) {
        rNav['isShow'] = false;
        return true;
      }
    });
  } else {
    lefts.some(rNav => {
      if (rNav['id'] === 2) {
        rNav['isShow'] = true;
        return true;
      }
    });
    rights.some(rNav => {
      if (rNav['id'] === 9) {
        rNav['isShow'] = true;
        return true;
      }
    });
  }

  // 是否显示目录 分享
  if (docWidth <= 1092) {
    lefts.some(rNav => {
      if (rNav['id'] === 3) {
        rNav['isShow'] = false;
        return true;
      }
    });
    rights.some(rNav => {
      if (rNav['id'] === 10) {
        rNav['isShow'] = false;
        return true;
      }
    });
  } else {
    lefts.some(rNav => {
      if (rNav['id'] === 3) {
        rNav['isShow'] = true;
        return true;
      }
    });
    rights.some(rNav => {
      if (rNav['id'] === 10) {
        rNav['isShow'] = true;
        return true;
      }
    });
  }

  // 是否显示放大
  if (docWidth <= 1056) {
    lefts.some(rNav => {
      if (rNav['id'] === 1) rNav['isShow'] = false;
      if (rNav['id'] === 99) {
        rNav['isShow'] = false;
        return true;
      }
    });
  } else {
    lefts.some(rNav => {
      if (isZoomIn) {
        if (rNav['id'] === 99) {
          rNav['isShow'] = true;
          return true;
        }
      } else {
        if (rNav['id'] === 1) {
          rNav['isShow'] = true;
          return true;
        }
      }
    });
  }

  // 实时计算是否处在手机端下
  store.commit('isMobileState', isMobile());
  // 动态计算是否窄屏
  store.commit('isSmallSizeState', isSmallSize());
};

export default {
  simple
};
