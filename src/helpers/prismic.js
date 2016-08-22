import {
  WithFragments,
  Document
} from 'prismic.io/lib/documents';

import {
  get
} from 'lodash';

export default ctx => {

  if (!ctx instanceof Document) {
    return console.error('ctx is not a Prismic Document instance');
  }

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
