import { FC } from "react";
import ApplyForm from "../component/ApplyForm";

interface ApplyPageProps {
  searchParams: { title?: string };
}

const ApplyPage: FC<ApplyPageProps> = ({ searchParams }) => {
  const title = searchParams.title || "Unknown Job";
  return (
    <div className="max-w-[1450px] w-[90%] mx-auto">
      <div className="w-full mt-5 text-center">
        <h1 className="md:text-xl font-extrabold uppercase mb-1">
          Appication for the {title} role
        </h1>
      </div>
      <ApplyForm />
    </div>
  );
};
export default ApplyPage;
