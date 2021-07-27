const mongodbutil = require("./database");
var db = mongodbutil.getDB();
var ObjectID = require("mongodb").ObjectID;

module.exports = {
  // Add a new device to the collection
  add: async function insertDevices(device) {
    const newDevice = {
      deviceName: device.deviceName,
      deviceModelNumber: device.deviceModelNumber,
      deviceBrandName: device.deviceBrandName,
      deviceMemory: device.deviceMemory,
      deviceRAM: device.deviceRAM,
      deviceSSD: device.deviceSSD,
      deviceDisplaySize: device.deviceDisplaySize,
      deviceProcessor: device.deviceProcessor,
      deviceWeight: device.deviceWeight,
      deviceOS: device.deviceOS,
      deviceDisplayResolution: device.deviceDisplayResolution,
      deviceOutOfStock: device.deviceOutOfStock,
      deviceCount: device.deviceCount,
      deviceImageName: device.deviceImageName,
    };
    const result = await db.collection("Devices").insertOne(newDevice);
    return JSON.stringify(result.ops);
  },
  // Update an existing device in the collection
  _update: async function updateDevice(deviceId, device) {
    const id = { _id: ObjectID(deviceId) };
    const options = { returnOriginal: false };
    var updatedDevice = {};

    // If the store owner updated the device without changing its image
    if (!device.deviceImageName) {
      updatedDevice = {
        $set: {
          deviceName: device.deviceName,
          deviceModelNumber: device.deviceModelNumber,
          deviceBrandName: device.deviceBrandName,
          deviceMemory: device.deviceMemory,
          deviceRAM: device.deviceRAM,
          deviceSSD: device.deviceSSD,
          deviceDisplaySize: device.deviceDisplaySize,
          deviceProcessor: device.deviceProcessor,
          deviceWeight: device.deviceWeight,
          deviceOS: device.deviceOS,
          deviceDisplayResolution: device.deviceDisplayResolution,
          deviceOutOfStock: device.deviceOutOfStock,
          deviceCount: device.deviceCount,
        },
      };
    }
    // If the store owner updated the device and changed its image
    else {
      updatedDevice = {
        $set: {
          deviceName: device.deviceName,
          deviceModelNumber: device.deviceModelNumber,
          deviceBrandName: device.deviceBrandName,
          deviceMemory: device.deviceMemory,
          deviceRAM: device.deviceRAM,
          deviceSSD: device.deviceSSD,
          deviceDisplaySize: device.deviceDisplaySize,
          deviceProcessor: device.deviceProcessor,
          deviceWeight: device.deviceWeight,
          deviceOS: device.deviceOS,
          deviceDisplayResolution: device.deviceDisplayResolution,
          deviceOutOfStock: device.deviceOutOfStock,
          deviceCount: device.deviceCount,
          deviceImageName: device.deviceImageName,
        },
      };
    }

    try {
      const _returnedNewdevice = await db
        .collection("Devices")
        .findOneAndUpdate(id, updatedDevice, options)
        .then((updatedDocument) => {
          return updatedDocument.value;
        })
        .catch((err) => {
          console.log(err);
        });

      return _returnedNewdevice;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  // Get the store devices based on a certain limit,
  // pagination is done using this method
  _getPaginated: async function getAllDevicesPaginated(limit) {
    //Gets a specific amount of devices without changing in the order
    const _getLimit = parseInt(limit);
    try {
      return await db.collection("Devices").find({}).limit(_getLimit).toArray();
    } catch (err) {
      console.log(err);
    }
  },
  // Get a specific device from the store collection based on his Id
  _getSpecificDevice: async function getSpecificDevice(deviceId) {
    const id = { _id: ObjectID(deviceId) };
    try {
      return await db.collection("Devices").find(id).toArray();
    } catch (err) {
      console.log(err);
    }
  },
  // Get all the devices of the store
  _get: async function getAllDevices() {
    try {
      return await db.collection("Devices").find().toArray();
    } catch (err) {
      console.log(err);
    }
  },

  // _getSpecificDevice: async function getSpecificDevice(deviceId) {
  //   const id = { _id: ObjectID(deviceId) };
  //   try {
  //     return await db.collection("Devices").find(id).toArray();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // Get a specific device from the collection based on its name
  _getDeviceByName: async function getDeviceByName(deviceName) {
    const _deviceName = { deviceName: deviceName };
    try {
      return await db.collection("Devices").find(_deviceName).toArray();
    } catch (err) {
      console.log(err);
    }
  },
  // Delete a specific device from the collection based on its Id
  _deleteSpecificDevice: async function deleteSpecificDevice(deviceId, res) {
    const id = { _id: ObjectID(deviceId) };
    var _deletedone = false;
    try {
      await db
        .collection("Devices")
        .find(id)
        .toArray()
        .then(async (result) => {
          if (result.length > 0) {
            await db.collection("Devices").deleteOne(id);
            console.log("device deleted");
            _deletedone = true;
          } else {
            console.log("device not found");
          }
        })
        .catch((err) => {
          console.log("device not found");
        });
    } catch (err) {
      console.log(err);
    }
    return _deletedone;
  },
};
