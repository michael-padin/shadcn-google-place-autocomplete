import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "~/env.mjs";
import { useForm } from "react-hook-form";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";
import { useToast } from "./ui/use-toast";

import { GPlaceInput } from "./GPlaceInput";

const FormSchema = z.object({
  place: z
    .string({
      required_error: "Please enter a place.",
    })
    .min(5, { message: "Must be 5 or more characters long" }),
});

export default function GPlaceForm() {
  const { toast } = useToast();
  const [placeListOPen, setPlaceListOPen] = useState(false);
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    debounce: 500,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
          <code className="text-xs text-white">{JSON.stringify(data)}</code>
        </pre>
      ),
    });
  };
  const handlePlaceValue = (place: string) => {
    // Keep the options displayed when the user is typing
    if (!placeListOPen) setPlaceListOPen(true);

    form.setValue("place", place);
    getPlacePredictions({ input: place });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <GPlaceInput
              value={field.value}
              placeListOpen={placeListOPen}
              handleSelect={(placeName) => {
                setPlaceListOPen(false);
                form.setValue("place", placeName);
              }}
              placePredictions={placePredictions}
              handlePlaceValue={handlePlaceValue}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
