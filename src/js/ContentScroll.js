export function ContentScroll(content) {
    if (content === '방사능') {
      return document.getElementsByClassName('top-box')[0].offsetTop;
    } else if (content === '세슘&삼중수소') {
      return document.getElementsByClassName('content')[0].offsetTop;
    }else if(content == 'Home'){
        console.log(content)
        return document.getElementsByTagName('body');
    }
    console.log(content)
    return document.documentElement.scrollTop + 70;
}