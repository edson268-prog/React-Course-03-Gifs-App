interface Props {
  title: string;
  searchesList: string[];

  onLabelClicked: (term: string) => void;
}

export const PreviousSearches = ({
  title,
  searchesList,
  onLabelClicked,
}: Props) => {
  return (
    <>
      <div className="previous-searches">
        <h2>{title}</h2>
        <ul className="previous-searches-list">
          {searchesList.map((term) => (
            <li
              key={term}
              onClick={() => {
                onLabelClicked(term);
              }}
            >
              {term}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
