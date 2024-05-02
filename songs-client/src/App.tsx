import React, { useEffect } from "react";
import Modal from "react-modal";
import { Link, Outlet, useMatches } from "react-router-dom";
import "./App.css";
import { Tab } from "@headlessui/react";
import { classNames } from "./utils";
import { IoDiscSharp } from "react-icons/io5";

function App() {
  useEffect(() => {
    Modal.setAppElement("#app");
  }, []);

  const tabs = [
    {
      name: "Songs",
      path: "/",
    },
    {
      name: "Stats",
      path: "/stats",
    },
  ];

  const matches: Array<any> = useMatches();

  return (
    <header id="app" className="w-full flex-col px-2 sm:px-0 justify-center">
      <div className="flex justify-between items-center bg-zinc-800 p-4 px-12">
        <h1 className="text-xl font-bold flex items-center">
          <IoDiscSharp className="text-3xl mr-1" />
          Songlist
        </h1>
        <nav className="min-w-[300px]">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-zinc-400/20 p-1">
              {tabs.map((tab, ix) => {
                return (
                  <Tab
                    key={ix}
                    className={classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                      matches[1].pathname === tab.path
                        ? "bg-white/80 text-zinc-700 shadow"
                        : "text-zinc-100 hover:bg-white/[0.12] hover:text-white",
                    )}
                  >
                    <Link
                      to={tab.path}
                      key={ix}
                      className="block h-full outline-none select-none"
                    >
                      {tab.name}
                    </Link>
                  </Tab>
                );
              })}
            </Tab.List>
          </Tab.Group>
        </nav>
        <div />
      </div>
      <main className="my-12">
        <Outlet />
      </main>
    </header>
  );
}

export default App;
