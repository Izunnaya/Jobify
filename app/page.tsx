export const revalidate = 1;
import About from "@/components/shared/About";
import Contact from "@/components/shared/Contact";
import Hero from "@/components/shared/Hero";
import Jobs from "@/components/shared/Jobs";
import Sponsors from "@/components/shared/Sponsors";
import { prisma } from "@/lib/prisma";

const Home = async () => {
  const jobs = await prisma.jobPosting.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <Hero jobs={jobs} />
      <Jobs />
      <Sponsors />
      <About />
      <Contact />
    </>
  );
};

export default Home;
