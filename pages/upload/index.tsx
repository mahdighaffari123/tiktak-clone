import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../../store/authStore";
import { client } from "../../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../../utils/constants";
import { addPost } from "../../service/post";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [wrongFileType, setWrongTypeFile] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  // const handlePost = async () => {
  //   if (caption && videoAsset?._id && category) {
  //     setSavingPost(true);

  //     const document = {
  //       _type: "post",
  //       caption,
  //       video: {
  //         _type: "file",
  //         asset: {
  //           _type: "reference",
  //           _ref: videoAsset?._id,
  //         },
  //       },
  //       userId: userProfile?._id,
  //       postedBy: {
  //         _type: "postedBy",
  //         _ref: userProfile?._id,
  //       },
  //       topic: category,
  //     };
  //   }
  //   // await addPost(document);
  //   await axios.post("http://localhost:3000/post", document);
  //   router.push("/");
  // };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const doc = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await addPost(doc);

      router.push("/");
    }
  };

  // const uploadVideo = async (event: any) => {
  //   const selectedFile = event.target.files[0];
  //   const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
  //   if (fileTypes.includes(selectedFile.type)) {
  //     client.assets
  //       .upload("file", selectedFile, {
  //         contentType: selectedFile.type,
  //         filename: selectedFile.name,
  //       })
  //       .then((data) => {
  //         setVideoAsset(data);
  //         setIsLoading(false);
  //       });
  //   } else {
  //     setIsLoading(false);
  //     setWrongTypeFile(true);
  //   }
  // };

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongTypeFile(false);
      setIsLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongTypeFile(true);
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 ">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer ">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl " />
                        </p>
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        702x1200 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="tex-center -text-xl font-semibold w-[250px] text-red-400 mt-4 ">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium ">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2 "
          />
          <label>Choose Category</label>
          <select
            onChange={(event) => setCategory(event.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p2 rounded cursor-pointer"
            value={category}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10 ">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discart
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] text-white  border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;