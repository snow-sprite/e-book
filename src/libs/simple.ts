interface Inavs {
  id: number;
  title: string;
  pic: HTMLElement;
  isShow: boolean;
}
export const simple = (
  docWidth: number,
  lefts: Array<Inavs>,
  rights: Array<Inavs>
) => {
  // 是否显示更多
  if (docWidth <= 1200) {
    rights.forEach(rNav => {
      if (rNav['id'] === 11 || rNav['id'] === 12) rNav['isShow'] = false;
      if (rNav['id'] === 13) rNav['isShow'] = true;
    });
  } else {
    rights.forEach(rNav => {
      if (rNav['id'] === 11 || rNav['id'] === 12) rNav['isShow'] = true;
      if (rNav['id'] === 13) rNav['isShow'] = false;
    });
  }

  // 是否显示自动翻页
  if (docWidth <= 1164) {
    lefts.forEach(rNav => {
      if (rNav['id'] === 4) rNav['isShow'] = false;
    });
  } else {
    lefts.forEach(rNav => {
      if (rNav['id'] === 4) rNav['isShow'] = true;
    });
  }

  // 是否显示缩略图 打开声音
  if (docWidth <= 1128) {
    lefts.forEach(rNav => {
      if (rNav['id'] === 2) rNav['isShow'] = false;
    });
    rights.forEach(rNav => {
      if (rNav['id'] === 9) rNav['isShow'] = false;
    });
  } else {
    lefts.forEach(rNav => {
      if (rNav['id'] === 2) rNav['isShow'] = true;
    });
    rights.forEach(rNav => {
      if (rNav['id'] === 9) rNav['isShow'] = true;
    });
  }

  // 是否显示目录 分享
  if (docWidth <= 1092) {
    lefts.forEach(rNav => {
      if (rNav['id'] === 3) rNav['isShow'] = false;
    });
    rights.forEach(rNav => {
      if (rNav['id'] === 10) rNav['isShow'] = false;
    });
  } else {
    lefts.forEach(rNav => {
      if (rNav['id'] === 3) rNav['isShow'] = true;
    });
    rights.forEach(rNav => {
      if (rNav['id'] === 10) rNav['isShow'] = true;
    });
  }

  // 是否显示放大
  if (docWidth <= 1056) {
    lefts.forEach(rNav => {
      if (rNav['id'] === 1) rNav['isShow'] = false;
    });
  } else {
    lefts.forEach(rNav => {
      if (rNav['id'] === 1) rNav['isShow'] = true;
    });
  }
};

export default {
  simple
};
