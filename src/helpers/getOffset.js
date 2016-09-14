const getOffset = (el, margin) => ((-Math.round(el.getBoundingClientRect().top) + margin) || 0)

export default getOffset;
