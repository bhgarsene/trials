
const vouchersModel = require('../Models/voucher');

module.exports = {

    getAll: function (req, res, next) {
        try {
            vouchersModel.find({}).sort({ createdAt: -1 }).exec(function (err, vouchers) {
                console.log("req");
                if (err) {
                    // res.json({ status: "failed", message: "no data found", "error": err });
                    next(err);
                } else {
                    res.json({ status: "successss", message: "vouchers list found!!!", data: { data: vouchers } });
                }

            });
        } catch (error) {
            console.log("there is an error")
            res.json({ status: "failed", message: "no data found", error });
        }

    },

    UnusedVoucher: function (req, res, next) {
        try {
            vouchersModel.find({ used: false }, function (err, vouchers) {
                if (err) {
                    res.json({ status: "failed", message: "no data found", "error": err });
                    next(err);
                } else {
                    res.json({ status: "successss", message: "vouchers list found!!!", count: vouchers.length, data: vouchers });
                }

            });
        } catch (error) {
            res.json({ status: "failed", message: "no data found", error });
        }

    },

    getAndUpdateVoucher: function (req, res, next) {
        try {
            vouchersModel.find({ used: false }, function (err, vouchers) {
                if (err) {
                    res.json({ status: "failed", message: "no data found", "error": err });
                    next(err);
                } else {
                    if (vouchers[0]) {
                        vouchersModel.findByIdAndUpdate(vouchers[0]._id, { used: true }, function (err, Info) {
                            if (err)
                                console.log(err);
                            else
                                res.json({ status: "successss", message: "voucher found successfully!!!", data: vouchers[0] });
                        })
                    }
                    else {
                        res.json({ status: "successss", message: "No voucher available"});
                    }
                }

            });
        } catch (error) {
            res.json({ status: "failed", message: "no data found", error });
        }

    },

    updateVoucherUsed: function (req, res, next) {
        vouchersModel.findById(req.params.id, function (err, voucherInfo) {
            if (!voucherInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                vouchersModel.findByIdAndUpdate(voucherInfo._id, { used: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " Updated successfully!!!", vouchers: { Info } })
                })
            }
        });

    },

    create: function (req, res, next) {
        vouchersModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "voucher added successfully!!!", data: result })

        });
    },

    insertMany: function (req, res, next) {
        vouchersModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "voucher added successfully!!!", data: result })

        });
    },

    updateById: function (req, res, next) {
        vouchersModel.findById(req.params.id, function (err, voucherInfo) {
            if (!voucherInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                vouchersModel.findByIdAndUpdate(voucherInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", vouchers: { Info } })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        vouchersModel.findById(req.params.id, function (err, voucherInfo) {
            if (!voucherInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                vouchersModel.deleteOne((voucherInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", vouchers: { Info } })
                })
            }
        });
    },

}					