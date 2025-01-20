import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBriefcase,
  faUniversity,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <section className="pt-16">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="Profile"
                    src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                    className="shadow-xl rounded-full h-32 w-32 object-cover border-4 border-white -mt-16"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2">
                Jenna Stones
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-lg"
                />
                Los Angeles, California
              </div>
              <div className="mb-2 mt-10">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-lg" />
                Solution Manager - Creative Tim Officer
              </div>
              <div className="mb-2">
                <FontAwesomeIcon icon={faUniversity} className="mr-2 text-lg" />
                University of Computer Science
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed ">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>
                  <a href="#more" className="font-normal text-pink-500">
                    Show more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm font-semibold py-1">
                Made with
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="hover:text-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Notus JS
                </a>
                by
                <a
                  href="https://www.creative-tim.com"
                  className="hover:text-blueGray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Profile;
