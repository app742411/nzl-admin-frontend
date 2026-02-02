import React from "react";

const AuctionProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold">Product Details</h3>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Info label="Product Name" value={product.product_name} />
        <Info label="Brand" value={product.brand} />
        <Info label="SKU" value={product.sku} />
        <Info label="Category" value={product.category_name} />
        <Info label="Vendor" value={product.vendor_name} />
        <Info label="Available Quantity" value={product.quantity} />
        <Info
          label="Weight"
          value={`${product.weight} ${product.weight_unit}`}
        />
        <Info label="Product Cost" value={`SAR ${product.product_cost}`} />
      </div>

      {/* DESCRIPTION */}
      {product.description && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-500">Description</p>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* ATTRIBUTES */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <TagList label="Colors" items={product.colors} />
        <TagList label="Sizes" items={product.sizes} />
        <TagList label="Tags" items={product.tags} />
      </div>
    </div>
  );
};

export default AuctionProductDetails;

/* ---------- HELPERS ---------- */

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value || "-"}</p>
  </div>
);

const TagList = ({ label, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-sm text-gray-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
