import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, MapPin, Phone, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
          className="flex items-center text-blue-500 mb-6"
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
        className="flex items-center text-blue-500 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Profiles
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto"
      >
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 relative">
          {profile.client_profile_url ? (
            <img
              src={profile.client_profile_url}
              alt={profile.client_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/600x400?text=No+Image";
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full py-12">
              <User size={96} className="text-gray-400" />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {profile.client_name}
          </h1>

          <div className="space-y-5">
            {profile.client_city && (
              <div className="flex items-center text-gray-700">
                <MapPin size={24} className="mr-4 text-blue-500" />
                <span className="text-lg">City: {profile.client_city}</span>
              </div>
            )}

            {profile.client_mobile && (
              <div className="flex items-center text-gray-700">
                <Phone size={24} className="mr-4 text-blue-500" />
                <span className="text-lg">Mobile: {profile.client_mobile}</span>
              </div>
            )}

            {profile.client_dob && (
              <div className="flex items-center text-gray-700">
                <Calendar size={24} className="mr-4 text-blue-500" />
                <span className="text-lg">
                  Date of Birth:{" "}
                  {new Date(profile.client_dob).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
