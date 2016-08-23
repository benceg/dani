import get from 'lodash/get';

import {
  WithFragments,
  Document
} from 'prismic.io/lib/documents';

export default function prismic(doc) {

  const ctx = (!(doc instanceof Document) ? new Document(doc.id, doc.uid, doc.type, doc.href, doc.tags, doc.slugs, doc.data) : doc)

  return {
    getParameter: (arg) => get(ctx, arg) || null,
    get: (arg) => WithFragments.prototype.get.call(ctx, arg) || null,
    getAll: (arg) => WithFragments.prototype.getAll.call(ctx, arg) || null,
    getText: (arg) => WithFragments.prototype.getText.call(ctx, arg) || '',
    getStructuredText: (arg) => WithFragments.prototype.getStructuredText.call(ctx, arg) || [],
    getHtml: (arg) => WithFragments.prototype.getHtml.call(ctx, arg) || '',
    getImage: (arg) => WithFragments.prototype.getImage.call(ctx, arg) || null
  }

}
