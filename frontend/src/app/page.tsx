"use client";
import axios from "axios";
import Link from "next/link";
import { FiUser, FiLogOut, FiSettings, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";

export default function Home() {
  const [user, setUser] = useState<any>({});
  const [theme, setTheme] = useState<null | any | string>("light");

  const toggleDarkMode = (x: any) => {
    if (x.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getUser = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getUser();

    if (typeof window !== "undefined") {
      setTheme(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      if (!localStorage.getItem("token")) {
        window.location.href = "/signup";
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme!);
    const localTheme: string = localStorage.getItem("theme")!.toString();
    document.querySelector("html")!.setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <main
      className={`flex-col ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100"
      } h-screen w-screen p-5 max-sm:p-0 relative`}
    >
      <div className="flex justify-between items-center w-full mb-8">
        <div>
          <p
            className={`font-semibold text-3xl max-sm:text-2xl ${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            BotStudio
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className={`flex items-center cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-purple-100"
              } p-2 rounded-lg`}
            >
              <div className="avatar placeholder mr-2">
                <div
                  className={`${
                    theme === "dark" ? "bg-indigo-400" : "bg-indigo-500"
                  } text-white mask mask-squircle w-10`}
                >
                  <span>
                    <FiUser />
                  </span>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {user?.name}
              </p>
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-box w-52 mt-2`}
            >
              <label htmlFor="settings_modal">
                <li className="flex">
                  <p
                    className={
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }
                  >
                    <FiSettings className="mr-2" />
                    Settings
                  </p>
                </li>
              </label>
              <li
                className="flex"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                <p className="text-red-500">
                  <FiLogOut className="mr-2" />
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <input type="checkbox" id="settings_modal" className="modal-toggle" />
      <div className="modal">
        <div
          className={`modal-box max-sm:w-full ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`flex items-center font-bold text-lg ${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            <FiSettings className="mr-2" /> Settings
          </h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <p
                className={`flex items-center py-4 ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                <FiMoon className="mr-2" />
                Dark Theme
              </p>
              <input
                type="checkbox"
                className={`toggle ${
                  theme === "dark" ? "bg-indigo-400" : "bg-indigo-500"
                }`}
                checked={theme === "dark"}
                onChange={(x) => toggleDarkMode(x)}
              />
            </label>
          </div>
          <div className="modal-action">
            <label
              htmlFor="settings_modal"
              className={`btn ${
                theme === "dark"
                  ? "bg-indigo-400 text-gray-900"
                  : "bg-indigo-500 text-white"
              }`}
            >
              Close
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="settings_modal">
          Cancel
        </label>
      </div>
      <ToastContainer />
    </main>
  );
}