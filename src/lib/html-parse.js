import ReactHtmlParser, {convertNodeToElement} from "react-html-parser";

function transformLinkRel(node, index) {
  const { type, name, attribs } = node;
  if (type === 'tag' && name === 'a' && attribs && attribs.href && attribs.href.indexOf('https://tangem.com') !== -1 ) {
    node.attribs = { ...node.attribs, rel: 'nofollow' }
    return convertNodeToElement(node, index, transformLinkRel);
  }
}

export function parseHtml(html) {
  return  ReactHtmlParser(html, {transform: transformLinkRel})
}
