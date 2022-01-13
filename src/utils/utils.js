const howManyCities = (arr) => {
  if (arr.length === 1) {
    return `${arr[0].reachPoint}`;
  } else if (arr.length === 2) {
    return `${arr[0].reachPoint} &mdash; ${arr[1].reachPoint}`;
  }
  return `${arr[0].reachPoint} &mdash; ${arr.length > 3 ? '...' : arr[1].reachPoint} &mdash; ${arr[arr.length - 1].reachPoint}`;
};

export { howManyCities };
