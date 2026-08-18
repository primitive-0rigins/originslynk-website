import { readFile, writeFile } from 'node:fs/promises';

import { DEFAULT_FORM_ENDPOINT } from '../src/config/contact.js';

const marker = '__FORM_ENDPOINT_ORIGIN__';
const endpoint = process.env.PUBLIC_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT;
const url = new URL(endpoint);

if (url.protocol !== 'https:') {
  throw new Error('PUBLIC_FORM_ENDPOINT must use HTTPS.');
}

const headersPath = new URL('../dist/_headers', import.meta.url);
const headers = await readFile(headersPath, 'utf8');

if (!headers.includes(marker)) {
  throw new Error(`Missing ${marker} in the built _headers file.`);
}

await writeFile(headersPath, headers.replaceAll(marker, url.origin));
