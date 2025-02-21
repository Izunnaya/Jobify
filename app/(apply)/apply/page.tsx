"use client";
import ApplyForm from "../component/ApplyForm";

// interface ApplyPageProps {
//   searchParams: { title?: string };
// }

import { useSearchParams } from "next/navigation";

const ApplyPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "Unknown Job";
  return (
    <div className="max-w-[1450px] w-[90%] mx-auto">
      <div className="w-full mt-5 text-center">
        <h1 className="md:text-xl font-extrabold uppercase mb-1">
          Appication for the {title} role.
        </h1>
      </div>
      <ApplyForm />
    </div>
  );
};
export default ApplyPage;
