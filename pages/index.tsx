import NoResult from "../components/NoResult/NoResult";
import VideoCard from "../components/VideoCard/VideoCard";

// inteface
import { Video } from "../interface/types";

// api
import { getAllPost } from "../service/post";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log("videos", videos);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResult text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await getAllPost();

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
