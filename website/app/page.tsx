import Hero from "../components/sections/Hero";
import ClanTree from "../components/tree/ClanTree";

export default function Home() {
  return (
    <main className="font-sans bg-gray-50 text-gray-900">
      <Hero />
      <ClanTree />
    </main>
  );
}
