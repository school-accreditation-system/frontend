"use client";

import Link from "next/link";

import { Input } from "../ui/input";
import { useEffect, useState, useRef } from "react";

import REQUEST_TYPES, { ALL_REQUEST_TYPES } from "@/constants/RequestTypes";
import { Globe, LogIn, Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, resetDialog } from "@/app/slicers/DialogSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  resetRequestType,
  selectRequestType,
  setRequestType,
} from "@/app/slicers/RequestTypeSlice";

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const router = useRouter();

  const selectedRequestType = useSelector(selectRequestType);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      const filtered = ALL_REQUEST_TYPES.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
      setShowResults(true);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    if (filteredRequests.length > 0) {
      const requestType = filteredRequests[0].requestType;
      dispatch(setRequestType(requestType));

      // if(selectedRequestType === "new-school-registration") router.push("/register-school")
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };
  const handleRequestNavigation = useCallback(() => {
    setShowResults(false);
    dispatch(openDialog());
  }, [dispatch]);
  useEffect(() => {
    if (!dialog.isOpen && dialog.wasOpened) {
      dispatch(resetDialog());
      dispatch(resetRequestType());
    }
  }, [dialog, router]);

  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-0 pb-24 relative overflow-hidden">
      {/* Navigation Bar - Sticky */}
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-secondary shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40 bg-white rounded-sm p-1 overflow-hidden shadow-sm">
              <Image
                src="/nesa-logo.png"
                alt="NESA Logo"
                className="object-contain p-0.5"
                fill
                priority={true}
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white rounded-full p-1 transition-all duration-200 hover:border hover:border-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={22} />
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signup"
              className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm"
            >
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Link>

            <Link
              href="/login"
              className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Link>

            <div className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              English
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary py-2 px-4 shadow-md">
            <div className="flex flex-col space-y-2">
              <Link
                href="/signup"
                className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm"
              >
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Link>

              <Link
                href="/login"
                className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>

              <div className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm cursor-pointer">
                <Globe className="h-4 w-4 mr-2" />
                English
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty space to compensate for fixed navbar */}
      <div className="h-16"></div>

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
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {showResults && filteredRequests.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden max-h-48 overflow-y-auto z-50">
                <div className="p-2">
                  {filteredRequests.map((request, index) => (
                    <div key={index}>
                      <div
                        // href={`/${request.requestType}`}
                        className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={handleRequestNavigation}
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
                      </div>
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
                  className="text-white text-sm px-3 py-1 hover:cursor-pointer rounded-full bg-white/20 hover:bg-white/30 transition-colors"
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
