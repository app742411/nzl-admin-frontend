import { useRef } from "react";

export const usePlacesAutocomplete = (onSelect) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const initAutocomplete = () => {
    if (autocompleteRef.current) return;
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current =
      new window.google.maps.places.Autocomplete(inputRef.current, {
  types: ["address"],
  fields: ["address_components", "formatted_address"],
});


    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place?.address_components) return;

      const get = (type) =>
        place.address_components.find((c) =>
          c.types.includes(type)
        )?.long_name || "";

      onSelect({
        address: place.formatted_address || "",
        city: get("locality"),
        state: get("administrative_area_level_1"),
      });
    });
  };

  return { inputRef, initAutocomplete };
};
