import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Input } from "./ui/input";
import type { PlaceData, PlaceFormFieldProps } from "types";

/**
 *
 * @param value: This parameter represents the current value of the input field for the place. It's used to set the value of the input element.
 * @param placeListOpen: This parameter is a boolean that indicates whether the list of place predictions is currently open or closed. It controls the visibility of the prediction list.
 * @param placePredictions: This parameter is an array of predicted place data. It contains suggestions for places based on user input.
 * @param handleSelect: This is a callback function that gets executed when a user selects a place from the list of predictions. It typically updates the selected place.
 * @param handlePlaceValue: This is a callback function that gets executed when the value of the place input field changes. It is responsible for updating the input field value and fetching new predictions based on user input.
 * @returns
 */

export function GPlaceInput({
  value,
  placeListOpen,
  placePredictions,
  handleSelect,
  handlePlaceValue,
}: PlaceFormFieldProps) {
  return (
    <FormItem className="flex flex-col">
      <FormLabel className="text-base">Place</FormLabel>
      <Command className="relative overflow-visible">
        <FormControl className="text-base">
          <Input
            placeholder="Search place..."
            className="w-full"
            onChange={(e) => handlePlaceValue(e.target.value)}
            value={value}
            type="text"
            autoComplete="off"
          />
        </FormControl>
        {placeListOpen && (
          <CommandList
            className={`absolute left-0 right-0 top-[46px] rounded-lg bg-white ${
              placePredictions.length > 0 ? " ring-1 ring-slate-200 animate-in fade-in-0 zoom-in-95" : ""
            }`}
          >
            <CommandGroup
              className={`${placePredictions.length > 0 ? "p-2" : "p-0"} `}
            >
              {placePredictions.map((place: PlaceData) => (
                <CommandItem
                  key={place.place_id}
                  onSelect={() => handleSelect(place?.description)}
                  className="text-base"
                >
                  {place.description}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
      <FormMessage />
    </FormItem>
  );
}
