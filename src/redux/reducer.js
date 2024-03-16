import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [
    {
      id: 1456,
      senderName: "Smith",
      receiverName: "John",
      sourceLocation: "Vadodara",
      destinationLocation: "Benglore",
      status: "Shipped",
      createdDate: new Date("2024-03-10"),
      currentLocation: "Vadodara",
    },
    {
      id: 2645,
      senderName: "Victor",
      receiverName: "Brian",
      sourceLocation: "Ranchi",
      destinationLocation: "Delhi",
      status: "In-Transit",
      createdDate: new Date("2024-03-11"),
      currentLocation: "Mumbai",
    },
    {
      id: 3454,
      senderName: "Jennifer",
      receiverName: "Harray",
      sourceLocation: "Chennai",
      destinationLocation: "Kolkatta",
      status: "Shipped",
      createdDate: new Date("2024-03-12"),
      currentLocation: "Chennai",
    },
  ],
};

export const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    addPackages: (state, action) => {
      let newPackage = action.payload;

      newPackage.id = Math.floor(Math.random() * 10000);
      newPackage.status = "Shipped";
      newPackage.createdDate = new Date();
      newPackage.currentLocation = newPackage.sourceLocation;

      state.packages.push(newPackage);
    },
    updatePackage: (state, action) => {
      return {
        packages: state.packages.map((item) => {
          return item.id === action.payload.id
            ? {
                ...item,
                ...action.payload,
              }
            : item;
        }),
      };
    },
  },
});

export const { addPackages, updatePackage } = packageSlice.actions;

export default packageSlice.reducer;
