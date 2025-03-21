import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, MapPin, Phone, Calendar, ArrowLeft } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NoAvatar from "../assets/no_avatar.png";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: profiles } = useSelector((state) => state.profiles);

  const profile = profiles.find((p) => p.client_id === id);

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-500 mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Profiles
        </button>

        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
          role="alert"
        >
          <p>
            Profile not found. The profile may have been deleted or you may have
            entered an invalid URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-500 mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Profiles
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 bg-gray-100">
            {profile.client_profile_url ? (
              <img
                src={profile.client_profile_url}
                alt={profile.client_name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = { NoAvatar };
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full py-12">
                <User size={96} className="text-gray-400" />
              </div>
            )}
          </div>

          <div className="w-full md:w-3/5 p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
            >
              {profile.client_name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, staggerChildren: 0.2 }}
              className="space-y-5"
            >
              {profile.client_city && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center text-gray-700"
                >
                  <MapPin size={24} className="mr-4 text-blue-500" />
                  <span className="text-lg">City: {profile.client_city}</span>
                </motion.div>
              )}

              {profile.client_mobile && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center text-gray-700"
                >
                  <Phone size={24} className="mr-4 text-blue-500" />
                  <span className="text-lg">
                    Mobile: {profile.client_mobile}
                  </span>
                </motion.div>
              )}

              {profile.client_dob && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center text-gray-700"
                >
                  <Calendar size={24} className="mr-4 text-blue-500" />
                  <span className="text-lg">
                    Date of Birth:{" "}
                    {new Date(profile.client_dob).toLocaleDateString()}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
