import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updatePackage } from "../redux/reducer";

const UpdateStatus = ({ isOpen, onClose, packageId }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    currentLocation: Yup.string()
      .min(3, "Location must be at least 3 character")
      .required("Location is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(
      updatePackage({
        id: packageId,
        ...values,
      })
    );
    setSubmitting(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4">
                <h3
                  className="text-lg font-medium text-gray-900"
                  id="modal-title"
                >
                  Update Status
                </h3>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    <Formik
                      initialValues={{
                        currentLocation: "",
                        status: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
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

export default UpdateStatus;
