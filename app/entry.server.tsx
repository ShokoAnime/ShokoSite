// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { AppLoadContext, EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server.browser';
import { Buffer } from 'node:buffer';

globalThis.Buffer = Buffer;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const abortController = new AbortController();
  const { signal } = abortController;

  let statusCode = responseStatusCode;
  let didError = false;

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
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
