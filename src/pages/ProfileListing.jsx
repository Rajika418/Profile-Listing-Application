import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Loader,
  CheckCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { fetchProfiles, resetProfileState } from "../slices/profileSlice";
import NoAvatar from "../assets/no_avatar.png";

const ProfileListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: profiles,
    loading,
    error,
    success,
  } = useSelector((state) => state.profiles);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showSuccess, setShowSuccess] = useState(success);

  useEffect(() => {
    dispatch(fetchProfiles());
    return () => {
      dispatch(resetProfileState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleViewDetails = (clientId) => {
    navigate(`/profile-details/${clientId}`);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProfiles = filteredProfiles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-4"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Client Profiles</h1>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center text-green-600 bg-green-100 px-4 py-2 rounded-md shadow-md"
            >
              <CheckCircle size={20} className="mr-2" />
              <span>Profiles loaded successfully</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {currentProfiles.map((profile, index) => (
          <motion.div
            key={profile.client_id}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {indexOfFirstItem + index + 1}
              </div>
              <div className="h-48 bg-gray-100">
                {profile.client_profile_url ? (
                  <img
                    src={profile.client_profile_url}
                    alt={profile.client_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = { NoAvatar };
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 truncate">
                {profile.client_name}
              </h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewDetails(profile.client_id)}
                className="flex items-center justify-center w-full cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <Eye className="mr-2" />
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {filteredProfiles.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {Math.min(indexOfFirstItem + 1, filteredProfiles.length)}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredProfiles.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredProfiles.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === number
                          ? "z-10 bg-blue-500 text-white focus:z-20"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {filteredProfiles.length === 0 && !loading && !error && (
        <div className="text-center py-10">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No profiles found</p>
        </div>
      )}
    </div>
  );
};

export default ProfileListing;
