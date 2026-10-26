import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

export default function CelebritySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          origin: "*", // required for CORS in the browser
        },
      });

      if (data.error) {
        throw new Error(data.error.info || "Wikipedia could not complete the search.");
      }

      const pages = data.query?.pages;
      if (!pages) {
        setError(`No celebrity profiles found for "${searchTerm}".`);
        return;
      }

      const matchingPages = Object.values(pages).sort(
        (a, b) => a.index - b.index,
      );
      const wikidataIds = [
        ...new Set(
          matchingPages
            .map((page) => page.pageprops?.wikibase_item)
            .filter(Boolean),
        ),
      ];

      if (wikidataIds.length === 0) {
        setError(`No celebrity profiles found for "${searchTerm}".`);
        return;
      }

      const { data: wikidata } = await axios.get(WIKIDATA_API, {
        params: {
          action: "wbgetentities",
          ids: wikidataIds.join("|"),
          props: "claims",
          format: "json",
          origin: "*",
        },
      });

      if (wikidata.error) {
        throw new Error(
          wikidata.error.info || "Wikidata could not verify the search results.",
        );
      }

      const list = matchingPages
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

      if (list.length === 0) {
        setError(`No celebrity profiles found for "${searchTerm}".`);
      } else {
        setResults(list);
      }
    } catch (err) {
      const apiError = axios.isAxiosError(err)
        ? err.response?.data?.error?.info
        : null;
      setError(
        apiError ||
        (err instanceof Error
          ? err.message
          : "Could not retrieve results from Wikipedia."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="mx-auto max-w-7xl pt-24">

        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any celebrity, e.g. Beyonce"
            aria-label="Search Wikipedia for a celebrity"
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-400 px-7 py-3 font-semibold text-black transition-colors hover:bg-blue-300 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-5 text-center text-red-400">
            {error}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((person) => (
            <div
              key={person.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-64 items-center justify-center bg-white/10 text-gray-400"
                >
                  No image
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{person.name}</h3>
                {person.description && (
                  <p className="mt-1 text-sm text-blue-300">
                    {person.description}
                  </p>
                )}
                {person.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-300">
                    {person.bio}
                  </p>
                )}
                <a
                  href={person.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  Read on Wikipedia
                </a>
                <div>
                  <Link
                    to={`/booking?celebrity=${encodeURIComponent(person.name)}`}
                    className="text-white bolder underline"
                  >
                    Book this Star
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Data and images from Wikipedia. Check image licenses before commercial use.
        </p>
      </div>
    </div>
  );
}