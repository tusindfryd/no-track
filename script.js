let websites = {
  google: /\w+%[^\&]+/,
  youtube: /\w+%3A[^\&]+/,
  facebook: /\w*%(?:[^%]*%\w(?:[2F]))+/,
  messenger: /\w+%[^\&]+/,
  instagram: /\w+%[^\&]+/
}

let decoding = (link) => {
  let querying = browser.tabs.query({ currentWindow: true, active: true });
  querying.then((tabs) => {
    let currentURL = tabs[0].url;
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
  });
}

let removetracker = (info, tab) => {
  decoding(info.linkUrl);
}

browser.contextMenus.create({
  title: "Copy without tracker",
  contexts: ["link"],
  onclick: removetracker
});
