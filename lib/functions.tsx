export function newLinesIntoParagraphs(string: string) {
  return string.split('\n').map((paragraph: string, counter: number) => {
    return <p key={counter}>{paragraph}</p>;
  });
}
