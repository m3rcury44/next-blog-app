import styles from './styles.module.scss';
import { ReactNode } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownContent = ({ children }: { children: string }) => {

  const P = ({ children }: { children: ReactNode }) => <p className="md-post-p">{children}</p>;
  const Li = ({ children }: { children: ReactNode }) => <li className="md-post-li">{children}</li>;
  const H1 = ({ children }: { children: ReactNode }) => <h1 className="md-post-h1">{children}</h1>;
  const H2 = ({ children }: { children: ReactNode }) => <h2 className="md-post-h2">{children}</h2>;
  const H3 = ({ children }: { children: ReactNode }) => <h3 className="md-post-h3">{children}</h3>;
  const Hr = () => <hr className="md-post-hr" />;

  return (
    <div className={styles.markdownContent}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ children }) => {
            return <P>{children}</P>;
          },
          li: ({ children }) => {
            return <Li>{children}</Li>;
          },
          h1: ({ children }) => {
            return <H1>{children}</H1>;
          },
          h2: ({ children }) => {
            return <H2>{children}</H2>;
          },
          h3: ({ children }) => {
            return <H3>{children}</H3>;
          },
          hr: Hr,
          code({ className, children, style, ref, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="md-post-code" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default MarkdownContent;
