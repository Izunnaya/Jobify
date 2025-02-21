import ApplyForm from "../../component/ApplyForm";
import { prisma } from "@/lib/prisma";
// interface ApplyPageProps {
//   searchParams: { title?: string };
// }

interface ApplyProps {
  params: Promise<{ id: string }>;
}

const ApplyPage = async ({ params }: ApplyProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const job = await prisma.jobPosting.findUnique({
    where: { id },
  });

  if (!job) {
    return <div>There's no job</div>;
  }
  return (
    <div className="max-w-[1450px] w-[90%] mx-auto">
      <div className="w-full mt-5 text-center">
        <h1 className="md:text-xl font-extrabold uppercase mb-1">
          Appication for the {job.name} role.
        </h1>
      </div>
      <ApplyForm />
    </div>
  );
};
export default ApplyPage;
