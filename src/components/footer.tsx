"use client";

import { POSTS } from "@/lib/constants";

import Image from "next/image";
import { Icons } from "./icons";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createSubscriber } from "@/lib/actions";
//import { useFormState } from "react-dom";
import { useActionState } from "react";

export default function Footer() {
  const initialState = { message: "", errors: {} };
  //const [state, dispatch] = useFormState(createSubscriber, initialState);

  const [state, dispatchFormAction] = useActionState(
    createSubscriber,
    initialState
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-800 mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Icons.logo className="h-6 w-6" />
              <span className="text-md font-semibold">Adu Dev</span> */}
              <Image
                src="/adudev-light-Logo.png"
                alt="logo"
                width={40}
                height={40}
                className="hidden dark:block"
              />
              <Image
                src="/adudev-Logo.png"
                alt="logo"
                width={40}
                height={40}
                className="block dark:hidden"
              />
              <p>AduDev</p>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Stay Up to Date with the latest news and insights from our blog.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://twitter.com/w3tsadev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Icons.Twitter className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </a>

              <a
                href="https://github.com/w3tsadev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Icons.gitHub className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold">Blog</h3>

            <ul className="space-y-2 text-sm">
              {POSTS.map((post) => (
                <li key={post.title}>
                  <Link
                    href={post.href}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold">Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:herman@adudev.co.uk"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/terms-of-services"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold">Newsletter</h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Subscribe to our newsletter to stay up-to-date with the latest
              news and updates.
            </p>

            {/* <form action={dispatch}> */}
            <form action={dispatchFormAction}>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  defaultValue=""
                  aria-describedby="email-error"
                />

                <Button>Subscribe</Button>
              </div>

              <div
                id="email-error"
                aria-label="polite"
                aria-atomic="true"
                className="px-1"
              >
                {state?.errors?.email && (
                  <p
                    key={state.errors.email[0]}
                    className="text-xs text-red-500 mt-2"
                  >
                    {state.errors.email[0]}
                  </p>
                )}

                {!state?.errors?.email && (
                  <p className="text-xs text-green-500 mt-2">
                    {state?.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
          &copy; {currentYear} AduDev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
