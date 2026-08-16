import { cn } from "@/lib/utils";
import { Image, Modal } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: any;
};

const formatLabel = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());

const UserDetails = ({ open: user, setOpen, data }: TPropsType) => {
  const [currentData, setCurrentData] = useState<any>();

  const { shopName, _id, shoptype, ...socialLinks } =
    currentData?.socialLinks || {};
  const socialLinkEntries = Object.entries(socialLinks).filter(
    ([, value]) => !!value,
  );

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <Modal
      open={!!user}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        padding: "0px",
      }}
    >
      <div className="bg-[#111827]">
        <div className="flex justify-between items-center">
          <div></div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={14}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>
        <div className="w-fit mx-auto relative">
          {currentData?.image?.url ? (
            <Image
              src={currentData?.image?.url}
              alt="profile-picture"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="size-[100px] aspect-square object-cover rounded-full bg-[#312912] flex items-center justify-center text-white text-2xl font-semibold">
              {currentData?.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-center mt-1.5 text-xs text-gray-200">
          {currentData?.about}
        </div>
        <div className="mt-5">
          <div className="flex justify-between gap-1.5 bg-[#21424617] py-3 px-2 border-b ">
            <h4>User name </h4>
            <p className="font-medium">{currentData?.fullName}</p>
          </div>

          <div className="flex justify-between gap-1.5 py-3  px-2 border-b">
            <h4>Email </h4>
            <p className="font-medium">{currentData?.email}</p>
          </div>

          <div className="flex justify-between gap-1.5 bg-[#21424617] py-3 px-2 border-b">
            <h4>Contact Number </h4>
            <p className="font-medium">{currentData?.phoneNumber || "N/A"}</p>
          </div>

          {/*<div className='flex justify-between gap-1.5 bg-[#21424617] py-3 px-2 border-b'>
            <h4>Location </h4>
            <p className='font-medium'></p>
          </div>*/}
          {/*<div className='flex justify-between gap-1.5  py-3 px-2 border-b'>
            <h4>Account Type </h4>
            <p className='font-medium capitalize'>{user?.role}</p>
          </div>*/}
          <div className="flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b">
            <h4>Role</h4>
            <p className="font-medium capitalize">
              {(currentData?.role as string)?.toLocaleLowerCase()}
            </p>
          </div>
          {/*<div className='flex justify-between gap-1.5   py-3 px-2 border-b'>
            <h4>Subscription Plan </h4>
            <p className='font-medium'>Basic</p>
          </div>
          <div className='flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b'>
            <h4>Company name </h4>
            <p className='font-medium'>N/A</p>
          </div>
          <div className='flex justify-between gap-1.5 py-3 px-2 border-b'>
            <h4>Streak Progress </h4>
            <p className='font-medium'>5 days streak</p>
          </div>*/}
          <div className="flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b">
            <h4>Status </h4>
            <p
              className={cn(
                "text-[#4BB54B]",
                !currentData?.isActive && "text-[#ee0808]",
              )}
            >
              {currentData?.isActive ? "Active" : "Blocked"}
            </p>
          </div>
          <div className="flex justify-between gap-1.5 bg-[#21424617] py-3 px-2 border-b">
            <h4>How did you hear </h4>
            <p className="font-medium">{currentData?.howDidYouHear || "N/A"}</p>
          </div>
          <div className="flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b">
            <h4>Country </h4>
            <p className="font-medium">{currentData?.country || "N/A"} </p>
          </div>
          <div className="flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b">
            <h4>Skill Level </h4>
            <p className="font-medium">
              {currentData?.personalization?.skillLevel || "N/A"}{" "}
            </p>
          </div>

          <div className="flex justify-between gap-1.5  bg-[#21424617] py-3 px-2 border-b">
            <h4>Years Skating </h4>
            <p className="font-medium">
              {currentData?.personalization?.yearsSkating || "N/A"}{" "}
            </p>
          </div>
          {currentData?.personalization?.interests?.length > 0 && (
            <div className="flex justify-between gap-3  bg-[#21424617] py-3 px-2 border-b max-w-[550px]">
              <h4>Interests </h4>
              <p className="font-medium capitalize">
                {currentData?.personalization?.interests?.map(
                  (interest: string, i: number) =>
                    i === currentData?.personalization?.interests?.length - 1
                      ? interest?.split("_").join(" ")
                      : interest?.split("_").join(", "),
                )}{" "}
              </p>
            </div>
          )}

          <div className="flex justify-between gap-1.5 py-3 px-2">
            <h4>Date of Join </h4>
            <p className="font-medium">
              {moment(currentData?.createdAt).format("LL")}
            </p>
          </div>

          {/* ========================== social links ============================== */}

          <div>
            <h2 className=" font-semibold text-gray-300 mt-3 mb-1 px-2">
              Social Links
            </h2>
            {socialLinkEntries.length === 0 ? (
              <p className="text-center text-xs text-gray-400 pb-3">
                No social media added
              </p>
            ) : (
              socialLinkEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center bg-[#21424617] py-3 px-2 border-b"
                >
                  <h4>{formatLabel(key)}</h4>
                  <Link
                    href={value as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 underline"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
