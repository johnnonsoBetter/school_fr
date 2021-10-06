import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import ScoredDraftReportContext from '../../../../context/teacher/ScoredDraftReportContext';


export default function GroupedStudentFilterInput() {

  const {scoredStudentDrafts} = React.useContext(ScoredDraftReportContext)



  const options = scoredStudentDrafts.map((option) => {
    const firstLetter = option.full_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      fullWidth
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.full_name}
      onChange={(event, value) => console.log(value)} 
      renderInput={(params) => <TextField size="small" {...params} label="Find Students" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { full_name: 'The Shawshank Redemption', year: 1994 },
  { full_name: 'The Godfather', year: 1972 },
  { full_name: 'The Godfather: Part II', year: 1974 },
  { full_name: 'The Dark Knight', year: 2008 },
  { full_name: '12 Angry Men', year: 1957 },
  { full_name: "Schindler's List", year: 1993 },
  { full_name: 'Pulp Fiction', year: 1994 },
  {
    full_name: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { full_name: 'The Good, the Bad and the Ugly', year: 1966 },
  { full_name: 'Fight Club', year: 1999 },
  {
    full_name: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    full_name: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { full_name: 'Forrest Gump', year: 1994 },
  { full_name: 'Inception', year: 2010 },
  {
    full_name: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { full_name: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { full_name: 'Goodfellas', year: 1990 },
  { full_name: 'The Matrix', year: 1999 },
  { full_name: 'Seven Samurai', year: 1954 },
  {
    full_name: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { full_name: 'City of God', year: 2002 },
  { full_name: 'Se7en', year: 1995 },
  { full_name: 'The Silence of the Lambs', year: 1991 },
  { full_name: "It's a Wonderful Life", year: 1946 },
  { full_name: 'Life Is Beautiful', year: 1997 },
  { full_name: 'The Usual Suspects', year: 1995 },
  { full_name: 'Léon: The Professional', year: 1994 },
  { full_name: 'Spirited Away', year: 2001 },
  { full_name: 'Saving Private Ryan', year: 1998 },
  { full_name: 'Once Upon a Time in the West', year: 1968 },
  { full_name: 'American History X', year: 1998 },
  { full_name: 'Interstellar', year: 2014 },
  { full_name: 'Casablanca', year: 1942 },
  { full_name: 'City Lights', year: 1931 },
  { full_name: 'Psycho', year: 1960 },
  { full_name: 'The Green Mile', year: 1999 },
  { full_name: 'The Intouchables', year: 2011 },
  { full_name: 'Modern Times', year: 1936 },
  { full_name: 'Raiders of the Lost Ark', year: 1981 },
  { full_name: 'Rear Window', year: 1954 },
  { full_name: 'The Pianist', year: 2002 },
  { full_name: 'The Departed', year: 2006 },
  { full_name: 'Terminator 2: Judgment Day', year: 1991 },
  { full_name: 'Back to the Future', year: 1985 },
  { full_name: 'Whiplash', year: 2014 },
  { full_name: 'Gladiator', year: 2000 },
  { full_name: 'Memento', year: 2000 },
  { full_name: 'The Prestige', year: 2006 },
  { full_name: 'The Lion King', year: 1994 },
  { full_name: 'Apocalypse Now', year: 1979 },
  { full_name: 'Alien', year: 1979 },
  { full_name: 'Sunset Boulevard', year: 1950 },
  {
    full_name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { full_name: 'The Great Dictator', year: 1940 },
  { full_name: 'Cinema Paradiso', year: 1988 },
  { full_name: 'The Lives of Others', year: 2006 },
  { full_name: 'Grave of the Fireflies', year: 1988 },
  { full_name: 'Paths of Glory', year: 1957 },
  { full_name: 'Django Unchained', year: 2012 },
  { full_name: 'The Shining', year: 1980 },
  { full_name: 'WALL·E', year: 2008 },
  { full_name: 'American Beauty', year: 1999 },
  { full_name: 'The Dark Knight Rises', year: 2012 },
  { full_name: 'Princess Mononoke', year: 1997 },
  { full_name: 'Aliens', year: 1986 },
  { full_name: 'Oldboy', year: 2003 },
  { full_name: 'Once Upon a Time in America', year: 1984 },
  { full_name: 'Witness for the Prosecution', year: 1957 },
  { full_name: 'Das Boot', year: 1981 },
  { full_name: 'Citizen Kane', year: 1941 },
  { full_name: 'North by Northwest', year: 1959 },
  { full_name: 'Vertigo', year: 1958 },
  {
    full_name: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { full_name: 'Reservoir Dogs', year: 1992 },
  { full_name: 'Braveheart', year: 1995 },
  { full_name: 'M', year: 1931 },
  { full_name: 'Requiem for a Dream', year: 2000 },
  { full_name: 'Amélie', year: 2001 },
  { full_name: 'A Clockwork Orange', year: 1971 },
  { full_name: 'Like Stars on Earth', year: 2007 },
  { full_name: 'Taxi Driver', year: 1976 },
  { full_name: 'Lawrence of Arabia', year: 1962 },
  { full_name: 'Double Indemnity', year: 1944 },
  {
    full_name: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { full_name: 'Amadeus', year: 1984 },
  { full_name: 'To Kill a Mockingbird', year: 1962 },
  { full_name: 'Toy Story 3', year: 2010 },
  { full_name: 'Logan', year: 2017 },
  { full_name: 'Full Metal Jacket', year: 1987 },
  { full_name: 'Dangal', year: 2016 },
  { full_name: 'The Sting', year: 1973 },
  { full_name: '2001: A Space Odyssey', year: 1968 },
  { full_name: "Singin' in the Rain", year: 1952 },
  { full_name: 'Toy Story', year: 1995 },
  { full_name: 'Bicycle Thieves', year: 1948 },
  { full_name: 'The Kid', year: 1921 },
  { full_name: 'Inglourious Basterds', year: 2009 },
  { full_name: 'Snatch', year: 2000 },
  { full_name: '3 Idiots', year: 2009 },
  { full_name: 'Monty Python and the Holy Grail', year: 1975 },
];
