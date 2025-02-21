"use client";

import { useForm } from "react-hook-form";
import {
  createJob,
  type FormData,
} from "@/app/(create)/actions/createJobServerActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { useEdgeStore } from "@/lib/edgestore";

const ApplyForm = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      author: "",
      location: "",
    },
  });

  const uploadCVHandler = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      setValue("img", res.url);
    }
  };

  useEffect(() => {
    if (file) {
      uploadCVHandler();
    }
  }, [file]);

  const onSubmit = handleSubmit(async (data) => {
    await createJob(data);
    reset();
  });

  return (
    <div className="max-w-[1450px] w-[90%] mx-auto md:my-20">
      <form onSubmit={onSubmit} className="mt-10">
        <div className="flex flex-col sm:gap-10 gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              id="name"
              label="Your Name"
              errors={errors}
              disabled={isSubmitting}
              register={{
                ...register("name", { required: true }),
              }}
            />
            <Input
              id="location"
              label="Location"
              errors={errors}
              disabled={isSubmitting}
              register={{
                ...register("location", { required: true }),
              }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              id="salary"
              label="Salary expectation (USD)"
              errors={errors}
              disabled={isSubmitting}
              register={{
                ...register("salary", {
                  required: true,
                  validate: (value) => {
                    const parsedValue = parseFloat(value.replace(/,/g, ""));
                    return !isNaN(parsedValue) || "Must be a number";
                  },
                }),
              }}
            />

            <div>
              <Input
                label="upload your resume"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
                id="file"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
        <input type="hidden" id="img" {...register("img")} />
        <Button marginTop type="submit">
          Apply
        </Button>
      </form>
    </div>
  );
};

export default ApplyForm;
