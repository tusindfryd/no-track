let websites = {
  google: /\w+%[^\&]+/,
  youtube: /\w+%3A[^\&]+/,
  facebook: /\w*%(?:[^%]*%\w(?:[2F]))+/,
  messenger: /\w+%[^\&]+/,
  instagram: /\w+%[^\&]+/
}

let decoding = (currentURL, link) => {
  let strippedURL = link;

  for (site in websites) {
    if (currentURL.includes(site)) {
      if (link.match(websites[site]) != null) {
        strippedURL = link.match(websites[site]);
      }
      break;
    }
  }

  strippedURL = decodeURIComponent(strippedURL);
  navigator.clipboard.writeText(strippedURL);
}

let removetracker = (info) => {
  decoding(info.pageUrl, info.linkUrl);
}

browser.contextMenus.create({
  title: "Copy without tracker",
  contexts: ["link"],
  onclick: removetracker
});
