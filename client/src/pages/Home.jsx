import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ExperienceContext } from "../pages/ExperienceContext"

function Home() {
  const navigate = useNavigate()
  const { filteredExperiences, loading } = useContext(ExperienceContext)

  if (loading)
    return (
      <div className="text-center py-12 text-lg font-medium text-gray-700">
        Loading experiences...
      </div>
    )

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Grid layout: 4 cards per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-[#f0f0f0] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={exp.image || "/placeholder.svg"}
                  alt={exp.name}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between "><h3 className="text-[16px] font-semibold mb-1 text-gray-900">
                  {exp.name}
                </h3>
                  <div className=" bg-[#D6D6D6] text-gray-800 text-[11px] font-semibold px-3 py-1 rounded-md shadow">
                    {exp.location}
                  </div></div>

                <p className="text-[12px] py-1 text-[#161616] mb-3 leading-snug line-clamp-2">
                  {exp.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <span className="text-[12px] items-center  font-semibold text-gray-900">
                    From 
                    <span className="text-[20px] pl-1 ">₹{exp.price}</span>
                  </span>
                  <button
                    onClick={() => navigate(`/details/${exp._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm">
            No experiences found.
          </p>
        )}
      </div>
    </main>
  )
}

export default Home
