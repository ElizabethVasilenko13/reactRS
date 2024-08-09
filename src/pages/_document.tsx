import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="en" suppressHydrationWarning={true}>
      <Head />
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
};

export default Document;