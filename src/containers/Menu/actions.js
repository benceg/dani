export const TOGGLE_OPEN = 'TOGGLE_OPEN';
export const CHANGE_TOP = 'CHANGE_TOP';

export function toggleOpen(open) {
  return {
    type: TOGGLE_OPEN,
    open
  }
}

export function changeTop(top) {
  return {
    type: CHANGE_TOP,
    top
  }
}
