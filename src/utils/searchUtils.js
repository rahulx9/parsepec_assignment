import ItemMatch from "../components/search/ItemMatch";

export function getSearchQuery(input, query) {
  const index = input.toLowerCase().indexOf(query.toLowerCase());
  if (index !== -1) {
    return {
      hasMatch: true,
      value: <ItemMatch text={input} query={query} index={index} />,
    };
  }
  return {
    hasMatch: false,
    value: input,
  };
}
