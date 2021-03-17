/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Interpolate, {
  interpolate,
  InterpolateProps,
  InterpolateValues,
} from '@docusaurus/Interpolate';

// Can't read it from context, due to exposing imperative API
import codeTranslations from '@generated/codeTranslations';

function getLocalizedMessage({
  id,
  message,
}: {
  message: string;
  id?: string;
}): string {
  return codeTranslations[id ?? message] ?? message;
}

export type TranslateParam<Str extends string> = {
  message: Str;
  id?: string;
  description?: string;
  values?: InterpolateValues<Str, string | number>;
};
// Imperative translation API is useful for some edge-cases:
// - translating page titles (meta)
// - translating string props (input placeholders, image alt, aria labels...)
export function translate<Str extends string>(
  {message, id}: TranslateParam<Str>,
  values?: InterpolateValues<Str, string | number>,
): string {
  const localizedMessage = getLocalizedMessage({message, id}) ?? message;
  return interpolate(localizedMessage, values);
}

export type TranslateProps<Str extends string> = InterpolateProps<Str> & {
  id?: string;
  description?: string;
};

// Maybe we'll want to improve this component with additional features
// Like toggling a translation mode that adds a little translation button near the text?
export default function Translate<Str extends string>({
  children,
  id,
  values,
}: TranslateProps<Str>): JSX.Element {
  const localizedMessage: string =
    getLocalizedMessage({message: children, id}) ?? children;

  return <Interpolate values={values}>{localizedMessage}</Interpolate>;
}
