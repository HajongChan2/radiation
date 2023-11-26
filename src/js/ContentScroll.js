export function ContentScroll(content) {
    if (content === '방사능') {
      return document.getElementsByClassName('top-box')[0].offsetTop;
    } else if (content === '세슘&삼중수소') {
      return document.getElementsByClassName('content')[0].offsetTop - 70;
    }else if(content == 'Home'){
      return document.getElementsByTagName('body');
    }else if(content == '실시간 댓글'){
      return document.getElementsByClassName('container')[0].offsetTop - 70;  
    }
    console.log(content)
    return document.documentElement.scrollTop + 70;
}