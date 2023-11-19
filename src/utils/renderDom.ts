export function render(
  query: string,
  block: {
    getContent: any;
    dispatchComponentDidMount: any;
  }
) {
  const root: any = document.querySelector(query);

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
