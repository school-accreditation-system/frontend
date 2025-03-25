"use client";

import Link from "next/link";


import { Input } from "../ui/input";
import { useEffect, useState, useRef } from "react";

import { REQUEST_TYPES } from "../../../utils/RequestTypes";
import { Search, X } from "lucide-react";

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);



  // Handle click outside search results to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter requests based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRequests([]);
      setShowResults(false);
    } else {
      const filtered = REQUEST_TYPES.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
      setShowResults(true);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-0 pb-24 relative overflow-hidden min-h-[50vh]">
   

      {/* Hero Content */}
      <div className="container mx-auto px-4">
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-16 md:mt-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            School Accreditation Portal
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Find all your educational accreditation services in one place
          </p>

          {/* Search Box with Results Dropdown */}
          <div ref={searchRef} className="relative mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Search for services or requests"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.trim() !== "" && setShowResults(true)}
                className="w-full rounded-md p-6 pl-12 pr-12 text-gray-800 placeholder:text-gray-400 bg-white border-0 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 text-base"
                style={{ backgroundColor: "white" }}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {showResults && filteredRequests.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden max-h-48 overflow-y-auto z-50">
                <div className="p-2">
                  {filteredRequests.map((request,index) => (
                    <div key={index}>
                      <Link
                        href={`/${request.requestType}`}
                        className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setShowResults(false)}
                      >
                        <div className="text-left">
                          <h3 className="font-medium text-gray-800">
                            {request.title}
                          </h3>
                          {request.description && (
                            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                              {request.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {showResults && searchTerm && filteredRequests.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-6 text-center">
                  <p className="text-gray-500">
                    No services found matching "{searchTerm}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Optional: Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-white/75 text-sm">Popular:</span>
            {["Accreditation", "Certificate", "Registration", "Renewal"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="text-white text-sm px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary/30 to-transparent"></div>
    </section>
  );
};
