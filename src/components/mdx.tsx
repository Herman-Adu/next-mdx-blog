/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import Alert from "./alert";

import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";

// custom table function
function Table({ data }: any) {
  // create header row
  const headers = data.headers.map((header: any, index: any) => (
    <th key={index}>{header}</th>
  ));

  // create table rows
  const rows = data.rows.map((cell: any, cellIndex: any) => (
    <td key={cellIndex}>{cell}</td>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// custom block quote function
function Blockquote(props: any) {
  return (
    <blockquote
      className="bg-blue-200 dark:bg-blue-950 dark:bg-opacity-30 bg-opacity-30 p-4 rounded-md blockquote"
      {...props}
    />
  );
}

// custom code block function
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children);

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// custom link function
function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

// rounded custom images function
/* function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
} */

// run javascript string manipulation against str
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with and
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    const slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// custom images function
function CustomImage(props: ImageProps) {
  // Aspect ratio of a default landscape photo
  const defaultSize = [400, 300];

  const [width, height] =
    typeof props.title === "string" && /^\d*x\d*$/.test(props.title as string)
      ? props.title.split("x").map((n) => parseInt(n))
      : defaultSize;

  return (
    <span
      className="flex flex-row justify-center "
      style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
    >
      <Image
        sizes="100vw"
        width={width}
        height={height}
        className="mt-4"
        {...(props as ImageProps)}
      />
    </span>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: CustomImage,
  a: CustomLink,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  Alert,
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
