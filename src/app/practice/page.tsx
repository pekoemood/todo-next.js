import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, DivideIcon } from "@heroicons/react/20/solid";

import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

export default function Example() {
  return (
    <div className="mx-auto mt-10 flex max-w-7xl items-center px-8">
      <div className="w-full border-t border-gray-900"></div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold text-gray-900">
          Project
        </span>
      </div>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
}
