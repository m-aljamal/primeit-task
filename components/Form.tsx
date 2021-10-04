import { useForm } from "react-hook-form";
import { Inputs } from "../Types";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import { useEffect, useState } from "react";
import { findEmailDomain } from "../utils/findEmaildomain";
import { validationSchema } from "../utils/formValidation";
import SvgLoading from "./SvgLoading";
const Form = ({ onSubmit, loading, submited }: any) => {
  const [showEduType, setShowEduType] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema) as any,
  });

  const email = watch("email");

  useEffect(() => {
    if (submited) {
      reset();
      setShowEduType(false);
    }
  }, [submited, reset]);

  useEffect(() => {
    setShowEduType(false);
    const doamin = findEmailDomain(email);
    if (doamin === "edu") setShowEduType(true);
  }, [email, setShowEduType]);

  return (
    <div className=" container text-white ">
      <h2 className="text-2xl mb-10">Add new User:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register("name")}
          placeholder="Name:"
          error={errors.name?.message}
        />
        <Input
          register={register("email")}
          placeholder="Email:"
          error={errors.email?.message}
        />
        {showEduType && (
          <select className="input" {...register("eduType")}>
            <option>student</option>
            <option>lecturer</option>
          </select>
        )}
        <Input
          register={register("password")}
          placeholder="Password:"
          error={errors.password?.message}
        />
        <div className="relative rounded-md">
          <button
            disabled={loading}
            type="submit"
            className={`w-full  bg-blue-400 py-3 rounded-md text-xl ${
              loading && "opacity-40 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
          {loading && <SvgLoading />}
        </div>
      </form>
    </div>
  );
};

export default Form;
