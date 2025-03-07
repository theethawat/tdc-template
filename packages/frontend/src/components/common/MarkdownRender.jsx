import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRender({ children }) {
  return (
    <div className='md-content'>
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}
