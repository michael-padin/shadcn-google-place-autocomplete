export type MatchedSubstring = {
  length: number;
  offset: number;
};

export type StructuredFormatting = {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
};

export type Term = {
  offset: number;
  value: string;
};

export type PlaceType = "shopping_mall" | "point_of_interest" | "establishment";

export type PlaceData = {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: PlaceType[];
};

export interface PlaceFormFieldProps {
  value: string;
  placeListOpen: boolean;
  placePredictions: PlaceData[];
  handleSelect: (placeName: string) => void;
  handlePlaceValue: (place: string) => void;
}
