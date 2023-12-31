import Head from "next/head";
import { cn } from "~/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import GPlaceForm from "~/components/GPlaceForm";
import { Toaster } from "~/components/ui/toaster";

export default function Home() {
  return (
    <>
      <Head>
        <title>GPlace Autocomplete</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Card className={cn("md:w-[500px]")}>
            <CardHeader>
              <CardTitle>Google Place Autocomplete</CardTitle>
              <CardDescription>
                Google Place Autocomplete service with the Shadcn UI
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <GPlaceForm />
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </main>
    </>
  );
}
