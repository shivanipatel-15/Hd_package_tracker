import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addPackages, updatePackage } from "../redux/reducer";

const PackageModal = ({ isOpen, onClose, selectedPackage, action, title }) => {
  const dispatch = useDispatch();
  let validationSchema = Yup.object().shape({
    destinationLocation: Yup.string()
      .min(3, "destination location must be at least 3 character")
      .required("destination location is required"),
    senderName: Yup.string()
      .min(3, "sender name must be at least 3 character")
      .required("sender name is required"),
    receiverName: Yup.string()
      .min(3, "receiver name must be at least 3 character")
      .required("receiverName is required"),
    sourceLocation: Yup.string()
      .min(3, "source location must be at least 3 character")
      .required("source location is required"),
  });

  let initialValues = {
    senderName: "",
    receiverName: "",
    sourceLocation: "",
    destinationLocation: "",
  };

  if (action === "update_status") {
    initialValues = {
      currentLocation: "",
      status: "",
    };
    validationSchema = Yup.object().shape({
      currentLocation: Yup.string()
        .min(3, "Location must be at least 3 character")
        .required("Location is required"),
      status: Yup.string().required("Status is required"),
    });
  }
  if (action === "update_location") {
    initialValues = {
      currentLocation: "",
    };
    validationSchema = Yup.object().shape({
      currentLocation: Yup.string()
        .min(3, "Location must be at least 3 character")
        .required("Location is required"),
    });
  }

  const handleSubmit = (values, { setSubmitting }) => {
    if (action === "add") {
      dispatch(addPackages(values));
    } else {
      dispatch(
        updatePackage({
          id: selectedPackage.id,
          ...values,
        })
      );
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-lg font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          {action === "add" && (
                            <>
                              <div className="mb-4">
                                <label
                                  htmlFor="senderName"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Sender Name
                                </label>
                                <Field
                                  type="text"
                                  id="senderName"
                                  name="senderName"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="senderName"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="sourceLocation"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Source Location
                                </label>
                                <Field
                                  type="text"
                                  id="sourceLocation"
                                  name="sourceLocation"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="sourceLocation"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="receiverName"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Receiver Name
                                </label>
                                <Field
                                  type="text"
                                  id="receiverName"
                                  name="receiverName"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="receiverName"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="destinationLocation"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Destination Location
                                </label>
                                <Field
                                  type="text"
                                  id="destinationLocation"
                                  name="destinationLocation"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="destinationLocation"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </>
                          )}
                          {action === "update_status" && (
                            <>
                              <div className="mb-4">
                                <label
                                  htmlFor="status"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Status
                                </label>
                                <Field
                                  as="select"
                                  id="status"
                                  name="status"
                                  className="mt-1 p-2 w-full border rounded-md"
                                >
                                  <option value="">Select Status</option>
                                  <option value="In-Transit">In-Transit</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </Field>
                                <ErrorMessage
                                  name="status"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="currentLocation"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Location
                                </label>
                                <Field
                                  type="text"
                                  id="currentLocation"
                                  name="currentLocation"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="currentLocation"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </>
                          )}
                          {action === "update_location" && (
                            <>
                              <div className="mb-4">
                                <label
                                  htmlFor="currentLocation"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Location
                                </label>
                                <Field
                                  type="text"
                                  id="currentLocation"
                                  name="currentLocation"
                                  className="mt-1 p-2 w-full border rounded-md"
                                />
                                <ErrorMessage
                                  name="currentLocation"
                                  component="p"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </>
                          )}

                          <div className="mt-6 flex justify-between">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex justify-center w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                            <button
                              type="button"
                              onClick={onClose}
                              className="inline-flex justify-center ml-4 w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageModal;
