export function useFetch() {
  return (url, setValue, setKey) =>
    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        setKey && setKey(Object.keys(json)[0]);
        setValue(Object.values(json)[0]);
      });
}
