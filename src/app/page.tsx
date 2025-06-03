import LatestPost from "@/components/home/latest-post";
import { MainNav } from "@/components/main-nav";

export default function Home() {
  return (
    <>
      <MainNav />

      <main>
        <div>
          <LatestPost />
        </div>
      </main>
    </>
  );
}
