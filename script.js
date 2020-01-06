decoding = (link, regex) => {
  let notracklink;
  if (decodeURIComponent(link).match(regex) != null) {
    notracklink = decodeURIComponent(link).match(regex);
  }
  else { 
    notracklink = link; 
  }

  let input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = notracklink;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

removetracker = (info, tab) => {
  let fb = /\w+:\/\/\w\w[^\?&]*/;
  decoding(info.linkUrl, fb);
}

chrome.contextMenus.create({
  title: "Copy without tracker",
  contexts: ["link"],
  onclick: removetracker
});