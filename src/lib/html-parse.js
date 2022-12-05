import ReactHtmlParser, {convertNodeToElement} from "react-html-parser";

export function parseHtml(html) {
  function transform(node, index) {
    const { type, name, attribs } = node;
    if (type === 'tag' && name === 'a' && attribs && attribs.href && attribs.href.indexOf('https://tangem.com') === -1 ) {
      node.attribs = { ...attribs, rel: 'nofollow' }
      return convertNodeToElement(node, index, transform);
    }
  }

  return  ReactHtmlParser(html, { transform })
}
