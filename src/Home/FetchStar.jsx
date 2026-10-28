import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { getCelebrityRate, recordFetchedCelebrities } from "../Admin/adminData.js";
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const WIKIPEDIA_SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary";
const FEATURED_CELEBRITIES = [
  "Beyoncé",
  "Taylor Swift",
  "Zendaya",
  "Dwayne Johnson",
  "Serena Williams",
  "Ryan Reynolds",
  "Bad Bunny",
  "Simone Biles",
];

async function fetchCelebrityResults(searchTerm, signal) {
  const { data } = await axios.get(WIKI_API, {
    params: {
      action: "query",
      generator: "search",
      gsrsearch: searchTerm,
      gsrlimit: 25,
      prop: "pageimages|extracts|description|pageprops",
      pithumbsize: 400,
      exintro: true,
      explaintext: true,
      exsentences: 2,
      format: "json",
      origin: "*",
    },
    signal,
  });

  if (data.error) {
    throw new Error(data.error.info || "Wikipedia could not complete the search.");
  }

  const pages = data.query?.pages;
  if (!pages) return [];

  const matchingPages = Object.values(pages).sort((a, b) => a.index - b.index);
  const wikidataIds = [
    ...new Set(
      matchingPages
        .map((page) => page.pageprops?.wikibase_item)
        .filter(Boolean),
    ),
  ];
  if (wikidataIds.length === 0) return [];

  const { data: wikidata } = await axios.get(WIKIDATA_API, {
    params: {
      action: "wbgetentities",
      ids: wikidataIds.join("|"),
      props: "claims",
      format: "json",
      origin: "*",
    },
    signal,
  });

  if (wikidata.error) {
    throw new Error(
      wikidata.error.info || "Wikidata could not verify the search results.",
    );
  }

  return matchingPages
    .filter((page) => {
      const itemId = page.pageprops?.wikibase_item;
      const claims = wikidata.entities?.[itemId]?.claims;
      const isHuman = (claims?.P31 || []).some(
        (claim) => claim.mainsnak?.datavalue?.value?.id === "Q5",
      );
      const hasDeathDate = (claims?.P570 || []).length > 0;
      return isHuman && !hasDeathDate;
    })
    .slice(0, 8)
    .map((page) => ({
      id: page.pageid,
      name: page.title,
      description: page.description || "",
      bio: page.extract || "",
      image: page.thumbnail?.source || null,
      link: `https://en.wikipedia.org/?curid=${page.pageid}`,
    }));
}

async function fetchFeaturedCelebrities(signal) {
  const responses = await Promise.allSettled(
    FEATURED_CELEBRITIES.map(async (name) => {
      const { data } = await axios.get(
        `${WIKIPEDIA_SUMMARY_API}/${encodeURIComponent(name)}`,
        { signal },
      );
      if (data.type !== "standard" || !data.pageid) return null;
      return {
        id: data.pageid,
        name: data.title,
        description: data.description || "",
        bio: data.extract || "",
        image: data.thumbnail?.source || null,
        link: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
      };
    }),
  );
  return responses
    .filter((response) => response.status === "fulfilled" && response.value)
    .map((response) => response.value);
}

function getApiError(error) {
  if (axios.isCancel(error)) return "";
  const apiError = axios.isAxiosError(error)
    ? error.response?.data?.error?.info
    : null;
  return apiError || (error instanceof Error
    ? error.message
    : "Could not retrieve results from Wikipedia.");
}

export default function CelebritySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [featuredReload, setFeaturedReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadFeaturedCelebrities() {
      setLoading(true);
      setError("");
      try {
        const list = await fetchFeaturedCelebrities(controller.signal);
        if (controller.signal.aborted) return;
        if (list.length === 0) {
          throw new Error("Wikipedia did not return any featured celebrity profiles. Please try again or search for a name.");
        }
        setResults(list);
        try {
          recordFetchedCelebrities(list);
        } catch (storageError) {
          console.error("Could not save fetched celebrity profiles for admin pricing.", storageError);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) setError(getApiError(loadError));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadFeaturedCelebrities();
    return () => controller.abort();
  }, [featuredReload]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm) {
      setError("Enter a celebrity name to search.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const list = await fetchCelebrityResults(searchTerm);

      if (list.length === 0) {
        setError(`No celebrity profiles found for "${searchTerm}".`);
      } else {
        setResults(list);
        try {
          recordFetchedCelebrities(list);
        } catch (storageError) {
          console.error("Could not save fetched celebrity profiles for admin pricing.", storageError);
        }
      }
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="celebrity-browser">
      <div className="celebrity-container">

        <form
          onSubmit={handleSearch}
          className="celebrity-search-form"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any celebrity, e.g. Beyonce"
            aria-label="Search Wikipedia for a celebrity"
            className="celebrity-search-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="celebrity-search-button disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="celebrity-spinner celebrity-spinner-button" aria-hidden="true" />
                <span className="sr-only">Searching</span>
              </>
            ) : "Search"}
          </button>
        </form>

        <section className="celebrity-heading-wrap" aria-live="polite">
          <div className="celebrity-heading">
            <div>
              <p className="celebrity-heading-eyebrow">
                {query.trim() ? "Search results" : "Featured"}
              </p>
              <h1>
                {query.trim() ? `Celebrities matching “${query.trim()}”` : "Discover celebrities"}
              </h1>
              <p>
                Profiles and images are fetched from Wikipedia.
              </p>
            </div>
            {!query.trim() && results.length > 0 && (
              <span className="celebrity-source">Featured talent · Wikipedia</span>
            )}
          </div>

          {loading && (
            <div className="celebrity-feedback" role="status" aria-label="Loading celebrity profiles">
              <span className="celebrity-spinner" aria-hidden="true" />
              <span className="sr-only">Loading celebrity profiles</span>
            </div>
          )}
          {error && (
            <div className="celebrity-error">
              <p role="alert">{error}</p>
              {!query.trim() && (
                <button
                  type="button"
                  onClick={() => setFeaturedReload((count) => count + 1)}
                  className="celebrity-retry"
                >
                  Retry loading celebrities
                </button>
              )}
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <p className="celebrity-empty">
              Enter a name above to search celebrity profiles.
            </p>
          )}
        </section>

        <div className="celebrity-profile-grid">
          {results.map((person) => {
            const rate = getCelebrityRate(person.name);
            return (
              <div
                key={person.id}
                className="celebrity-profile-card"
              >
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="celebrity-profile-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="celebrity-profile-placeholder">
                    ✦
                  </div>
                )}
                <div className="celebrity-profile-body">
                  <h2>{person.name}</h2>
                  <p className="celebrity-price-tag">
                    {rate === null
                      ? "Request a quote"
                      : `Estimated from $${rate.toLocaleString("en-US")}`}
                  </p>
                  {person.description && (
                    <span className="celebrity-description">
                      {person.description}
                    </span>
                  )}
                  {person.bio && (
                    <p className="celebrity-bio">
                      {person.bio}
                    </p>
                  )}
                  <div className="celebrity-profile-links">
                    <a
                      href={person.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Wikipedia <span aria-hidden="true">↗</span>
                    </a>
                    <Link
                      to={`/booking?celebrity=${encodeURIComponent(person.name)}`}
                    >
                      Request booking <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="celebrity-attribution">
          Starting prices are profession-based estimates; final fees depend on event details and are confirmed by the admin. Data and images from Wikipedia. Check image licenses before commercial use.
        </p>
      </div>
    </div>
  );
}