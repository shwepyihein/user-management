import { PencilAltIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { doUpdateUser, getUserDetail } from "../../api/user/user";
import { classNames } from "../../utils";
import * as yup from "yup";
import { useEffect } from "react";

export interface userUpdate {
  user_Id: string;
  email?: string;
  martial_status?: string;
  salutation?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  address?: string;
  country?: string;
  postal_code?: string;
  nat?: string;
  dob?: string;
  gender?: string;
  spouse_salutation?: string;
  spouse_first_name?: string;
  spouse_last_name?: string;
  hobbies?: string;
  sport?: string;
  music?: string;
  movie?: string;
}

const schema = yup
  .object({
    user_Id: yup.string().required("User is Required"),
  })

  .required();

export default function ProfilePage() {
  const [userEdit, setUserEdit] = useState(true);

  const [personalNavigation, setPersonalNavigation] = useState([
    { id: 1, name: "Basic_info", current: true },
    { id: 2, name: "Additonal Details", current: false },
    { id: 3, name: "Spouse Details", current: false },
    { id: 4, name: "Personal Perfernces", current: false },
  ]);

  const [selectNavigation, setSelectNavigation] = useState<number>(1);

  const handleChange = (item: {
    id: number;
    name: string;
    current: boolean;
  }) => {
    const newNavigation: { id: number; name: string; current: boolean }[] =
      personalNavigation.map((pN) =>
        pN.id === item.id ? { ...pN, current: true } : { ...pN, current: false }
      );
    setSelectNavigation(item.id);
    setPersonalNavigation(newNavigation);
  };

  const { data: userDetail, refetch } = useQuery("profile", getUserDetail);

  const { mutate: UpdateUserDetail } = useMutation(
    (userData: userUpdate) => doUpdateUser(userData),
    {
      onSuccess: (res) => {
        refetch();
        setUserEdit(true);
      },
      onError: (error: any) => {
        //
      },
    }
  );

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_Id: "",
      email: "",
      martial_status: "",
      salutation: "",
      first_name: "",
      last_name: "",
      mobile: "",
      address: "",
      country: "",
      postal_code: "",
      nat: "",
      dob: "",
      gender: "",
      spouse_salutation: "",
      spouse_first_name: "",
      spouse_last_name: "",
      hobbies: "",
      sport: "",
      music: "",
      movie: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (submitData: userUpdate) => {
    //

    UpdateUserDetail(submitData);
  };

  useEffect(() => {
    reset(userDetail?.data);
  }, []);

  const navigation = personalNavigation.filter((item, idx) =>
    userDetail?.data.martial_status === "married" && idx === 2 ? null : item
  );

  return (
    <div>
      <div className="relative overflow-hidden bg-sky-700 pb-32">
        <>
          <div
            aria-hidden="true"
            className={classNames(
              "absolute inset-y-0 bottom-0 inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
            )}
          >
            <div className="absolute inset-0 flex">
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#0a527b" }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#065d8c" }}
              />
            </div>
            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                  fill="#0369a1"
                />
                <path
                  d="M1465.84 308L16.816 0H1750v308h-284.16z"
                  fill="#065d8c"
                />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                <path
                  d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                  fill="#0a4f76"
                />
              </svg>
            </div>
          </div>
          <header className="relative py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Profile
              </h1>
            </div>
          </header>
        </>
      </div>

      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y relative divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <div
                  className="absolute top-5 cursor-pointer right-5"
                  onClick={() => {
                    setUserEdit(false);
                  }}
                >
                  <PencilAltIcon className="w-5 h-5" />
                </div>
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    return (
                      <div
                        key={item.name}
                        onClick={() => {
                          handleChange(item);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group cursor-pointer border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                        )}
                      >
                        <span className="truncate">{item.name}</span>
                      </div>
                    );
                  })}
                </nav>
              </aside>

              <form
                className="divide-y divide-gray-200 lg:col-span-9"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Profile section */}
                {/* Basic_info */}
                {selectNavigation === 1 && (
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="salutation"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salutation
                          </label>
                          {userEdit ? (
                            <p className="text-md py-3">
                              {userDetail?.data.salutation}
                            </p>
                          ) : (
                            <select
                              id="salutation"
                              {...register("salutation")}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="US"
                            >
                              <option value={"Mr."}>MR .</option>
                              <option value={"Mrs."}>MRS .</option>
                              <option value={"Miss."}>MISS .</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.first_name}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("first_name")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.last_name}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("last_name")}
                            name="last_name"
                            id="last_name"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="col-span-12">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.email}
                          </p>
                        ) : (
                          <input
                            {...register("email")}
                            type="text"
                            name="email"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* spouse Details */}

                {selectNavigation === 3 && (
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="salutation"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salutation
                          </label>
                          {userEdit ? (
                            <p className="text-md py-3">
                              {userDetail?.data.spouse_salutation}
                            </p>
                          ) : (
                            <select
                              id="salutation"
                              {...register("spouse_salutation")}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="US"
                            >
                              <option value={"Mr."}>MR .</option>
                              <option value={"Mrs."}>MRS .</option>
                              <option value={"Miss."}>MISS .</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.spouse_first_name}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("spouse_first_name")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.spouse_last_name}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("spouse_last_name")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* AddionalINfo */}
                {selectNavigation === 2 && (
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Addtional Info
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gender
                          </label>
                          {userEdit ? (
                            <p className="text-md py-3">
                              {userDetail?.data.gender}
                            </p>
                          ) : (
                            <select
                              id="gender"
                              {...register("gender")}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="male"
                            >
                              <option value={"male"}>Male</option>
                              <option value={"female"}>Female</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="martial_status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Martial Status
                          </label>
                          {userEdit ? (
                            <p className="text-md py-3">
                              {userDetail?.data.martial_status}
                            </p>
                          ) : (
                            <select
                              id="martial_status"
                              {...register("martial_status")}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={"married"}>Married</option>
                              <option value={"single"}>Single</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.mobile}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("mobile")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          address
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.address}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("address")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          country
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.country}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("country")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="postal_code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Postal Code
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.postal_code}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("postal_code")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="nat"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nationality
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">{userDetail?.data.nat}</p>
                        ) : (
                          <input
                            type="text"
                            {...register("nat")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date of Birth
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">{userDetail?.data.dob}</p>
                        ) : (
                          <input
                            type="text"
                            {...register("dob")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* personal reference */}
                {selectNavigation === 4 && (
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Perference
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hobbies
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.hobbies}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("hobbies")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="sport"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sport
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.sport}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("sport")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="music"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Music
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.music}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("music")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="movie"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Movie
                        </label>
                        {userEdit ? (
                          <p className="text-md py-3">
                            {userDetail?.data.movie}
                          </p>
                        ) : (
                          <input
                            type="text"
                            {...register("movie")}
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Privacy section */}
                {!userEdit && (
                  <div>
                    <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                      <button
                        type="button"
                        onClick={() => {
                          setUserEdit(true);
                        }}
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
