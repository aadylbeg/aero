const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const fs = require("fs");
const { Files } = require("../models");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

exports.getAllFiles = catchAsync(async (req, res) => {
	let { originalName, list_size, page } = req.query,
		where = {},
		limit = parseInt(list_size) ? parseInt(list_size) : 10,
		offset = (page - 1) * limit || 0;

	if (originalName) where.originalName = originalName;

	const files = await Files.findAll({
		where,
		order: [["id", "desc"]],
		limit,
		offset,
	});

	return res.status(200).send(files);
});

exports.getFile = catchAsync(async (req, res, next) => {
	const file = await Files.findOne({ where: { uuid: req.params.uuid } });
	if (!file) return next(new AppError("Not found", 404));

	return res.status(200).send(file);
});

exports.addBrand = catchAsync(async (req, res, next) => {
	if (!req.file) return next(new AppError("No file catched", 400));

	const { mimetype, originalname, size } = req.file;
	const fileSizeInKB = size / 1024;
	const fileSizeInMB = fileSizeInKB / 1024;

	let formattedSize;
	if (fileSizeInMB > 1) formattedSize = `${fileSizeInMB.toFixed(2)} MB`;
	else formattedSize = `${fileSizeInKB.toFixed(2)} KB`;

	const newFile = await Files.create({
		originalName: originalname,
		fileName: req.file.filename,
		extension: originalname.split(".").pop(),
		mimeType: mimetype,
		size: formattedSize,
	});

	return res.status(200).send(newFile);
});

exports.updateFile = catchAsync(async (req, res, next) => {
	const file = await Files.findOne({ where: { uuid: req.params.uuid } });
	if (!file) return next(new AppError("Not found", 404));
	if (!req.file) return next(new AppError("No file catched", 400));

	const { mimetype, originalname, size } = req.file;
	const fileSizeInKB = size / 1024;
	const fileSizeInMB = fileSizeInKB / 1024;

	let formattedSize;
	if (fileSizeInMB > 1) formattedSize = `${fileSizeInMB.toFixed(2)} MB`;
	else formattedSize = `${fileSizeInKB.toFixed(2)} KB`;

	await file.update({
		originalName: originalname,
		fileName: req.file.filename,
		extension: originalname.split(".").pop(),
		mimeType: mimetype,
		size: formattedSize,
	});

	return res.status(200).send(file);
});

exports.deleteFile = catchAsync(async (req, res, next) => {
	const file = await Files.findOne({ where: { uuid: req.params.uuid } });
	if (!file) return next(new AppError("Not found", 404));

	fs.unlink(`./public/${file.fileName}`, (err) => {});
	await file.destroy();

	return res.status(204).send();
});

exports.downloadFile = catchAsync(async (req, res, next) => {
	const file = await Files.findOne({ where: { uuid: req.params.uuid } });
	if (!file) return next(new AppError("Not found", 404));

	const filePath = path.join(__dirname, "../public/");
	res.download(filePath + file.fileName, file.fileName, (err) => {
		if (err) {
			res.status(500).send({
				message: "Could not download the file. " + err,
			});
		}
	});
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/");
	},
	filename: function (req, file, cb) {
		const extension = file.originalname.split(".").pop();
		cb(null, uuidv4() + "." + extension);
	},
});

const upload = multer({ storage: storage });

exports.uploadFile = upload.single("file");
