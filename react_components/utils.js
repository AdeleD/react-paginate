export function classNameIfDefined(className, orClassName = '') {
  return className !== undefined && className !== null
    ? className
    : orClassName;
}
