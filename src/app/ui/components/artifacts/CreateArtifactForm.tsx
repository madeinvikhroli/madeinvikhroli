import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import mivPlaceholder from "../../../../../public/assets/common/placeholder.svg";

interface Artifact {
  name: string;
  description: string;
  price: number | null;
  image: File | string;
  by_member: string;
  url: string;
  file_types: string[];
}

interface Props {
  setShowCreateArtifactForm: any;
  newArtifactDetails: Artifact;
  handleNewArtifactDetailsChange: any;
  artifactImageFile: File | null;
  setArtifactImageFile: any;
  artifactCreated: boolean;
  createNewArtifact: any;
}

const fileTypes = [
  "png",
  "jpeg",
  "jpg",
  "gif",
  "svg",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "url",
];

const CreateArtifactForm = ({
  setShowCreateArtifactForm,
  newArtifactDetails,
  handleNewArtifactDetailsChange,
  artifactImageFile,
  setArtifactImageFile,
  artifactCreated,
  createNewArtifact,
}: Props) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [showImageAction, setShowImageAction] = useState(false);
  const [showFileTypesDropdown, setShowFileTypesDropdown] = useState(false);

  const fileTypesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("portal-root"));
  }, []);

  const handleArtifactImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      handleNewArtifactDetailsChange("image", reader.result as string);
    };
    reader.readAsDataURL(file);
    setArtifactImageFile(file);
  };

  const addFileType = (fileType: string) => {
    if (newArtifactDetails.file_types.includes(fileType)) {
      const newFileTypes = newArtifactDetails.file_types.filter(
        (type) => type !== fileType
      );
      handleNewArtifactDetailsChange("file_types", newFileTypes);
      return;
    }
    const newFileTypes = [...newArtifactDetails.file_types, fileType];
    handleNewArtifactDetailsChange("file_types", newFileTypes);
    console.log(newArtifactDetails.file_types);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fileTypesDropdownRef.current &&
        !fileTypesDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFileTypesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!portalRoot) return null;
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen">
      <div
        onClick={() => setShowCreateArtifactForm(false)}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"
      />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-screen md:h-fit md:w-fit md:min-w-[400px] bg-white p-4 md:rounded-[16px]">
        {artifactCreated ? (
          <div className="flex flex-col items-center gap-4 p-2 md:p-[24px]">
            <p className="text-[64px]">✅</p>
            <div className="flex flex-col gap-2 font-medium text-[14px]">
              <p>Artifact Created</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={createNewArtifact}
            className="w-full flex flex-row gap-4"
          >
            <div className="relative w-[400px] max-h-[400px] aspect-square">
              <Image
                src={newArtifactDetails?.image || mivPlaceholder}
                fill={true}
                onMouseEnter={() => setShowImageAction(true)}
                onMouseLeave={() => setShowImageAction(false)}
                onClick={() =>
                  document.getElementById("artifact_image")?.click()
                }
                className="max-w-[400px] max-h-[400px] object-contain aspect-square rounded-[10px] border-[1px] border-[#4D4D4D] cursor-pointer"
                alt=""
              />
              {showImageAction && (
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("artifact_image")?.click()
                  }
                  onMouseEnter={() => setShowImageAction(true)}
                  className="absolute top-[50%] left-[50%] translate-[-50%] text-nowrap h-fit bg-black text-white px-2 py-1 rounded-[5px] text-[12px] font-semibold cursor-pointer"
                >
                  {artifactImageFile ? "Change Image" : "Add Image"}
                </button>
              )}
            </div>
            <input
              onChange={handleArtifactImageChange}
              id="artifact_image"
              type="file"
              className="hidden"
            />
            <div className="flex flex-col gap-2 font-medium text-[14px]">
              <div className="flex flex-row gap-4">
                <label className="w-full line-clamp-1 flex flex-col gap-2">
                  Name
                  <input
                    type="text"
                    className="w-full border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal active:outline-none focus:outline-none"
                    value={newArtifactDetails?.name}
                    onChange={(e) =>
                      handleNewArtifactDetailsChange("name", e.target.value)
                    }
                    required
                  />
                </label>
                <label className="min-w-[30%] line-clamp-1 flex flex-col gap-2">
                  Price
                  <input
                    type="text"
                    className="border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal active:outline-none focus:outline-none"
                    value={newArtifactDetails?.price || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || val === " ") {
                        handleNewArtifactDetailsChange("price", "");
                        return;
                      }
                      if (/^\d*\.?\d*$/.test(val)) {
                        handleNewArtifactDetailsChange("price", val);
                      }
                    }}
                    required={!fileTypes.includes("url")}
                  />
                </label>
              </div>
              <label className="h-auot line-clamp-1 flex flex-col gap-2">
                Description
                <textarea
                  className="h-auto border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal active:outline-none focus:outline-none"
                  value={newArtifactDetails?.description}
                  onChange={(e) =>
                    handleNewArtifactDetailsChange(
                      "description",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className=" line-clamp-1 flex flex-col gap-2 overflow-visible">
                File Type
                <div className="w-full relative overflow-visible flex flex-row justify-between">
                  <div className="w-full min-h-[36px] flex flex-row flex-wrap gap-1 p-1 border-[1px] border-[#4D4D4D] rounded-[5px]">
                    {newArtifactDetails?.file_types.map((fileType) => (
                      <p
                        key={fileType}
                        className="bg-[#4D4D4D] text-white text-[12px] px-2 py-1 rounded-[5px]"
                      >
                        {fileType.replace(" ", "")}
                      </p>
                    ))}
                    <p
                      onClick={() => setShowFileTypesDropdown(true)}
                      className="ml-auto"
                    >
                      Select
                    </p>
                  </div>
                  <div className="absolute top-[36px] right-2 flex flex-col gap-1">
                    {showFileTypesDropdown && (
                      <div
                        ref={fileTypesDropdownRef}
                        className="rounded-[5px] p-2 flex flex-col gap-1 font-medium bg-white"
                      >
                        {fileTypes.map((fileType) => (
                          <p
                            onClick={() => addFileType(fileType)}
                            key={fileType}
                            className={`${
                              newArtifactDetails?.file_types.includes(fileType)
                                ? "bg-neutral-400"
                                : "bg-white"
                            } p-1 text-[12px] rounded-[5px] text-nowrap select-none cursor-pointer`}
                            // selected={newArtifactDetails?.file_types.includes(
                            //   fileType
                            // )}
                          >
                            {fileType}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </label>
              {newArtifactDetails?.file_types?.includes("url") && (
                <label className="h-auot line-clamp-1 flex flex-col gap-2">
                  URL to Resources
                  <input
                    type="text"
                    className="h-auto border-[1px] border-[#4D4D4D] rounded-[5px] px-2 py-1 font-normal active:outline-none focus:outline-none"
                    value={newArtifactDetails?.url}
                    onChange={(e) =>
                      handleNewArtifactDetailsChange("url", e.target.value)
                    }
                  />
                </label>
              )}
              <button
                type="submit"
                key="submit"
                className="w-full text-[12px] line-clamp-1 bg-black text-white p-2 rounded-[5px] mt-auto"
              >
                Create Artifact
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    portalRoot
  );
};

export default CreateArtifactForm;
