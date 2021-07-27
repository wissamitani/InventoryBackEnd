const express = require("express");
const router = express.Router();
const actions = require("../utilitiesFunctions/execute");
const fs = require("fs");
const multer = require("multer");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Upload multer for uploading images to the server
let _upload = multer({
  storage: multer.diskStorage({
    destination(reqq, file, callback) {
      callback(null, "./uploads");
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  }),
}).single("deviceImageName");

// API to get the devices of the store with pagination
router.get("/getAllDevicesPaginated/:limit", (req, res) => {
  try {
    actions.getPagination(req, res);
  } catch (err) {
    console.log(err);
  }
});
// API to add a new device , and edit an existing device.
// id = 0 => We are adding a new device ,
// id != 0 => We are updating an existing device based on its id ,
router.post("/addeditDevice/:id", (req, res) =>
  _upload(req, res, async function () {
    const _urlId = req.params.id;
    const data = {
      deviceName: req.body.deviceName,
      deviceModelNumber: req.body.deviceModelNumber,
      deviceBrandName: req.body.deviceBrandName,
      deviceMemory: req.body.deviceMemory,
      deviceRAM: req.body.deviceRAM,
      deviceSSD: req.body.deviceSSD,
      deviceDisplaySize: req.body.deviceDisplaySize,
      deviceProcessor: req.body.deviceProcessor,
      deviceWeight: req.body.deviceWeight,
      deviceOS: req.body.deviceOS,
      deviceDisplayResolution: req.body.deviceDisplayResolution,
      deviceOutOfStock: req.body.deviceOutOfStock,
      deviceCount: req.body.deviceCount,
      deviceImageName: req.file != null && req.file.filename,
    };

    // Add Mode
    if (_urlId == 0) {
      try {
        await actions.addDevice(data, req, res);
      } catch (err) {
        console.log(err);
      }
    }
    // Edit Mode
    else {
      try {
        actions.updateSpecificDevice(data, req, res);
      } catch (err) {
        console.log(err);
      }
    }
  })
);
// API to get the devices of the store without pagination
router.get("/getAllDevices", (req, res) => {
  try {
    actions.getDevices(req, res);
  } catch (err) {
    console.log("catch");
  }
});
// API to get a specific device based on its id
router.get("/getDevice/:id", (req, res) => {
  try {
    actions.getSpecificDevice(req, res);
  } catch (err) {
    console.log(err);
  }
});
// API to get a specific device image when getting the devices.
// Called in the frontEnd, HomeScreen - Card
router.get("/getDeviceImage/:id", async (req, res) => {
  const _deviceId = req.params.id;
  try {
    var _imgPath = await actions.getSpecificDeviceImagePath(req, res);
    fs.readFile("uploads/" + _imgPath, function (err, content) {
      if (err) {
        res.writeHead(400, { "Content-type": "text/html" });
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": "image/jpeg" });
        res.end(content);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
// API to delete a specific device from the store based on its id.
router.delete("/deleteDevice/:id", (req, res) => {
  try {
    actions.deleteSpecificDevice(req, res);
  } catch (err) {
    console.log(err);
  }
});
// API to delete a specific device from the store based on its name.
router.get("/getDeviceByName/:name", (req, res) => {
  try {
    actions.getDeviceByName(req, res);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
