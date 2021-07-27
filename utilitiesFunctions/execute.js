const insertDevice = require("../database/insertDevices");

module.exports = {
  // This method will call the add method inside the database/insertDevice.js
  // After adding the device to the collection, it will return the added device
  // to the user with a status of OK(200)
  addDevice: async function addDevice(data, req, res) {
    console.log("add device");
    var device = {
      deviceName: data.deviceName,
      deviceModelNumber: data.deviceModelNumber,
      deviceBrandName: data.deviceBrandName,
      deviceMemory: data.deviceMemory,
      deviceRAM: data.deviceRAM,
      deviceSSD: data.deviceSSD,
      deviceDisplaySize: data.deviceDisplaySize,
      deviceProcessor: data.deviceProcessor,
      deviceWeight: data.deviceWeight,
      deviceOS: data.deviceOS,
      deviceDisplayResolution: data.deviceDisplayResolution,
      deviceOutOfStock: data.deviceOutOfStock,
      deviceCount: data.deviceCount,
      deviceImageName: data.deviceImageName,
    };
    // Setting the returned object after adding it to the collection
    let newObject = await insertDevice.add(device);

    res.status(200).json({
      status: "SUCCESS",
      message: "Device added",
      data: JSON.parse(newObject),
    });
    return newObject;
  },
  // This method will call the _update method inside the database/insertDevice.js
  // After updating the device, it will return the updated device
  // to the user with a status of OK(200) , else it will return
  // an error with status of 400.
  updateSpecificDevice: async function updateSpecificDevice(data, req, res) {
    try {
      var device = {
        deviceName: data.deviceName,
        deviceModelNumber: data.deviceModelNumber,
        deviceBrandName: data.deviceBrandName,
        deviceMemory: data.deviceMemory,
        deviceRAM: data.deviceRAM,
        deviceSSD: data.deviceSSD,
        deviceDisplaySize: data.deviceDisplaySize,
        deviceProcessor: data.deviceProcessor,
        deviceWeight: data.deviceWeight,
        deviceOS: data.deviceOS,
        deviceDisplayResolution: data.deviceDisplayResolution,
        deviceOutOfStock: data.deviceOutOfStock,
        deviceCount: data.deviceCount,
        deviceImageName: data.deviceImageName,
      };

      //Check if the update is done or not.
      const _updateDone = await insertDevice._update(req.params.id, device);

      if (_updateDone !== null) {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Device Updated",
          data: JSON.stringify(_updateDone),
        });
      } else {
        return res.status(400).json({
          status: "FAILED",
          message: "Device not updated",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the _getPaginated method inside the database/insertDevice.js
  // After fetching the required number of devices, it will return the list of devices
  // to the user with a status of OK(200)
  getPagination: async function getAllPaginated(req, res) {
    try {
      let _fetchedData = await insertDevice._getPaginated(req.params.limit);

      return res.status(200).json({
        status: "SUCCESS",
        message: "Devices Fetched",
        data: _fetchedData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the getAllDevices method inside the database/insertDevice.js
  // After fetching all the devices, it will return the list of devices
  // to the user with a status of OK(200)
  getDevices: async function getAllDevices(req, res) {
    try {
      let _fetchedData = await insertDevice._get();
      return res.status(200).json({
        status: "SUCCESS",
        message: "Devices Fetched",
        data: _fetchedData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the _getSpecificDevice method inside the database/insertDevice.js
  // It will return the searched device if found, otherwise it will inform the user that the
  // device is not found.
  getSpecificDevice: async function getSpecificDevice(req, res) {
    try {
      let _fetchedDevice = await insertDevice._getSpecificDevice(req.params.id);

      if (_fetchedDevice.length == 0) {
        return res.status(400).json({
          status: "FAILED",
          message: "Device not found",
        });
      } else {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Device Fetched",
          data: _fetchedDevice,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the _getSpecificDevice method inside the database/insertDevice.js
  // It will return the image name of the device, in order to display it.
  getSpecificDeviceImagePath: async function getSpecificDeviceImagePath(
    req,
    res
  ) {
    try {
      const _fetchedDevice = await insertDevice._getSpecificDevice(
        req.params.id
      );

      if (_fetchedDevice.length > 0) {
        return _fetchedDevice[0].deviceImageName;
      }
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the getDeviceByName method inside the database/insertDevice.js
  // It will return the searched device if found, otherwise it will inform the user that the
  // device is not found.
  getDeviceByName: async function getDeviceByName(req, res) {
    try {
      let _fetchedDevice = await insertDevice._getDeviceByName(req.params.name);

      if (_fetchedDevice.length == 0) {
        return res.status(400).json({
          status: "FAILED",
          message: "No devices not found",
        });
      } else {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Devices Fetched",
          data: _fetchedDevice,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  // This method will call the _deleteSpecificDevice method inside the database/insertDevice.js
  // It will delete a specific device based on its id.
  // It will inform the user if the device is deleted or not.
  deleteSpecificDevice: async function deleteSpecificDevice(req, res) {
    try {
      const _taskIsDone = await insertDevice._deleteSpecificDevice(
        req.params.id,
        res
      );

      if (_taskIsDone) {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Device Deleted",
        });
      } else {
        return res.status(400).json({
          status: "FAILED",
          message: "Device not deleted",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: "FAILED",
        message: "Failed to delete device",
      });
    }
  },
};
