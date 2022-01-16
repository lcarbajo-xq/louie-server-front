import { SearchPlaceholder } from './SearchPlaceholder'
import { SearchContent } from './SearchContent'
import { useAppContext } from '../../context/AppContext'
import { useInputSearch } from '../../hooks/useInputSearch'
import './styles.scss'

const NoResults = () => <h3>No Results found</h3>

export const Search = ({ setCurrentTrack }) => {
  const [{ home }] = useAppContext()

  const loading = false

  const { search, isEmpty, handleInputChange, searchResults } = useInputSearch()

  return (
    <section className='app-route'>
      <div className='search-container'>
        <div className='search-component'>
          <input
            className='search-input'
            type='text'
            placeholder='Search Albums, Tracks or Artists'
            value={search}
            onChange={handleInputChange}
          />
        </div>
        {loading ? (
          <SearchPlaceholder />
        ) : isEmpty ? (
          <NoResults />
        ) : (
          <>
            {!search.length > 0 ? (
              <SearchContent content={home} setCurrentTrack={setCurrentTrack} />
            ) : (
              <SearchContent content={searchResults} title='Search Results' />
            )}
          </>
        )}
      </div>
    </section>
  )
}
