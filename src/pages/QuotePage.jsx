import topic from "../data/topics";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const QuotePage = () => {
  const { slug } = useParams();

  let topicData = topic.find((t) => t.slug === slug);

  if (!topicData) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div>
      <h1>{topicData.name}</h1>
    </div>
  );
};

export default QuotePage;
