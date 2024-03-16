import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPackage from "./AddPackage";
import UpdateLocation from "./UpdateLocation";
import StatusChip from "./StatusChip";
import UpdateStatus from "./UpdateStatus";
import { formateDate } from "../utils/utils";

function PackageList() {
  const packages = useSelector((state) => state.packages);

  const [addPackageModalOpen, setAddPackageModalOpen] = useState(false);
  const [updateLocationModalOpen, setUpdateLocationModalOpen] = useState(false);
  const [updateStatusModalOpen, setUpdateStatusModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleUpdateLocation = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setUpdateLocationModalOpen(true);
  };

  const handleCloseUpdateLocation = () => {
    setSelectedPackage(null);
    setUpdateLocationModalOpen(false);
  };

  const handleUpdateStatus = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setUpdateStatusModalOpen(true);
  };

  const handleCloseUpdateStatus = () => {
    setSelectedPackage(null);
    setUpdateStatusModalOpen(false);
  };

  useEffect(() => {
    sortData(sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages]);

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortData(newOrder);
  };

  // Function to sort data by date
  const sortData = (order) => {
    const sorted = [...packages].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.createdDate) - new Date(b.createdDate);
      } else {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
    });
    setSortedData(sorted);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Package List</h2>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setAddPackageModalOpen(true);
            }}
          >
            Add New Package
          </button>
        </div>
        <div>
          <table className="table-auto min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Package NO
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Sender Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Receiver Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Source Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Destination Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Current Location
                </th>
                <th
                  className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase"
                  onClick={toggleSortOrder}
                >
                  <div className="flex">
                    Created Date
                    {sortOrder === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedData &&
                sortedData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">
                      {item.senderName}
                    </td>
                    <td className="px-6 py-4">
                      {item.receiverName}
                    </td>
                    <td className="px-6 py-4">
                      {item.sourceLocation}
                    </td>
                    <td className="px-6 py-4">
                      {item.destinationLocation}
                    </td>
                    <td className={`px-6 py-4 rounded-xl `}>
                      <StatusChip status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                      {item.currentLocation}
                    </td>
                    <td className="px-6 py-4">
                      {formateDate(item.createdDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col font-medium">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded mb-2 w-40"
                          onClick={() => handleUpdateStatus(item)}
                          disabled={
                            item.status === "Delivered" ||
                            item.status === "Cancelled"
                          }
                          style={{
                            backgroundColor:
                              item.status === "Delivered" ||
                              item.status === "Cancelled"
                                ? "#BFDBFE"
                                : "",
                          }}
                        >
                          Update Status
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white p-1 rounded w-40"
                          onClick={() => handleUpdateLocation(item)}
                          disabled={
                            item.status === "Delivered" ||
                            item.status === "Cancelled"
                          }
                          style={{
                            backgroundColor:
                              item.status === "Delivered" ||
                              item.status === "Cancelled"
                                ? "#A7F3D0"
                                : "",
                          }}
                        >
                          Update Location
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddPackage
        isOpen={addPackageModalOpen}
        onClose={() => setAddPackageModalOpen(false)}
      />
      {selectedPackage && (
        <UpdateLocation
          isOpen={updateLocationModalOpen}
          onClose={handleCloseUpdateLocation}
          packageId={selectedPackage.id}
        />
      )}
      {selectedPackage && (
        <UpdateStatus
          isOpen={updateStatusModalOpen}
          onClose={handleCloseUpdateStatus}
          packageId={selectedPackage.id}
        />
      )}
    </>
  );
}

export default PackageList;
