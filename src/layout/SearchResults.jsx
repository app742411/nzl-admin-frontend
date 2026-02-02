import React from "react";
import { Link } from "react-router";
import { Search, Clock, User, Package, Tag, File, Layers } from "lucide-react";

const CategoryBlock = ({ title, icon: Icon, items, type }) => (
  <div className="mb-4">
    <h4 className="text-xs uppercase text-gray-400 font-semibold mb-2 flex items-center gap-2">
      <Icon size={14} /> {title}
    </h4>

    <div className="border rounded-lg divide-y bg-white overflow-hidden">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/${type}/${item.id}`}
          className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center justify-between"
        >
          <span>{item.name || item.title || item.email}</span>
        </Link>
      ))}
    </div>
  </div>
);

const SearchResults = ({ results, query }) => {
  return (
    <div className="p-4 max-h-[450px] overflow-y-auto">
      {/* KEYWORDS */}
      {results.keywords?.length > 0 && (
        <CategoryBlock
          title="Keywords"
          type="keywords"
          icon={Search}
          items={results.keywords.map((k) => ({ id: k, name: k }))}
        />
      )}

      {/* RECENT SEARCHES */}
      {results.recents?.length > 0 && (
        <CategoryBlock
          title="Recent Searches"
          type="recent"
          icon={Clock}
          items={results.recents.map((k) => ({ id: k, name: k }))}
        />
      )}

      {/* USERS */}
      {results.users?.length > 0 && (
        <CategoryBlock
          title="Users"
          type="users"
          icon={User}
          items={results.users}
        />
      )}

      {/* PRODUCTS */}
      {results.products?.length > 0 && (
        <CategoryBlock
          title="Products"
          type="products"
          icon={Package}
          items={results.products}
        />
      )}

      {/* CATEGORIES */}
      {results.categories?.length > 0 && (
        <CategoryBlock
          title="Categories"
          type="categories"
          icon={Tag}
          items={results.categories}
        />
      )}

      {/* FILES */}
      {results.files?.length > 0 && (
        <CategoryBlock
          title="Files"
          type="files"
          icon={File}
          items={results.files}
        />
      )}

      {/* AUCTIONS */}
      {results.auctions?.length > 0 && (
        <CategoryBlock
          title="Auctions"
          type="auctions"
          icon={Layers}
          items={results.auctions}
        />
      )}
    </div>
  );
};

export default SearchResults;
