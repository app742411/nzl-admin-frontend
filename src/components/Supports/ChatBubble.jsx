export function UserBubble({ text, image }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-md rounded-2xl bg-gray-100 px-4 py-2">
        <p className="text-sm text-gray-800">{text}</p>

        {image && <img src={image} className="mt-2 max-h-64 rounded-lg" />}
      </div>
    </div>
  );
}

export function AdminBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-md rounded-2xl bg-blue-600 px-4 py-2">
        <p className="text-sm text-white">{text}</p>
      </div>
    </div>
  );
}
