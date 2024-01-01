import { Button } from "@/components/ui/button";
import { Header } from "@/features/header";
import { cn } from "@/lib/utils";
import { fontHeading } from "@/utils/fonts";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background text-foreground">
      <Header />
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-8">
        <h1
          className={cn(
            "w-2/3 text-center font-heading text-7xl font-bold",
            fontHeading.variable,
          )}
        >
          Blazing fast developer experience
        </h1>
        <p>A CLI tool for creating Next.js apps inspired by T3.</p>
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
