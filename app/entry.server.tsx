// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server.browser';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
) {
  const abortController = new AbortController();
  const { signal } = abortController;

  let statusCode = responseStatusCode;
  let didError = false;

  const body = await renderToReadableStream(
    <ServerRouter context={reactRouterContext} url={request.url} />,
    {
      signal,
      onError(error: unknown) {
        didError = true;
        console.error(error);
        // Do not mutate responseStatusCode here
      },
    },
  );

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady;
  }

  if (didError) {
    statusCode = 500;
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
    get [Symbol.toStringTag]() {
      return 'Response';
    },
  });
}
