export function useSplitText() {
  return (ref, inteval = 0, delay = 0) => {
    let text = ref.current.innerText;
    let tags = "";
    let count = 0;

    for (let letter of text) {
      count++;
      tags += `<span style='display:inline-block; transition-delay:${
        inteval * count + delay
      }s'>${letter}</span>`;
    }
    ref.current.innerHTML = tags;
  };
}
