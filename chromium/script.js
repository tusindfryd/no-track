let websites = {
  google: /\w+%[^\&]+/,
  youtube: /\w+%3A[^\&]+/,
  facebook: /\w*%(?:[^%]*%\w(?:[2F]))+/,
  messenger: /\w+%[^\&]+/,
  instagram: /\w+%[^\&]+/
}

let removetracker = (info) => {
  let currentURL = info.pageUrl;
  let strippedURL = info.linkUrl;

  for (site in websites) {
    if (currentURL.includes(site)) {
      if (info.linkUrl.match(websites[site]) != null) {
        strippedURL = info.linkUrl.match(websites[site]);
      }
      break;
    }
  }

  strippedURL = decodeURIComponent(strippedURL);
  let input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = strippedURL;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

chrome.contextMenus.create({
  title: "Copy without tracker",
  contexts: ["link"],
  onclick: removetracker
});
