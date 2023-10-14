export function useFetch() {
  return (url, setValue, setKey) =>
    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        const arr = Object.values(json).filter((data) => data.length);
        const result = arr.filter((data) => data.length);
        setKey && setKey(Object.keys(json)[0]);
        setValue(result);
      });
}
