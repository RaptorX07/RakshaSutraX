const Playbook = require('../models/Playbooks');
const mongoose = require('mongoose');

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res, next) => {
  const perPage = 6;
  const page = parseInt(req.query.page, 10) || 1;

  const locals = {
    title: "Dashboard",
    description: "RakshaShutraX - Incident Response Playbook.",
  };

  try {
    const playbooks = await Playbook.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
      { $skip: perPage * (page - 1) },
      { $limit: perPage },
    ]);

    const count = await Playbook.countDocuments({ user: req.user.id });

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      playbooks,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error("Error in dashboard controller:", error);
    next(error);
  }
};

/**
 * GET /
 * View Specific Playbook
 */
exports.dashboardViewPlaybook = async (req, res) => {
  const playbook = await Playbook.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (playbook) {
    res.render("dashboard/view-playbook", {
      playbookID: req.params.id,
      playbook,
      layout: "../views/layouts/dashboard"
    });
  } else {
    res.send("Something went wrong.");
  }
};

/**
 * PUT /
 * Update Specific Playbook
 */
exports.dashboardUpdatePlaybook = async (req, res) => {
  try {
    await Playbook.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE /
 * Delete Playbook
 */
exports.dashboardDeletePlaybook = async (req, res) => {
  try {
    await Playbook.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Playbooks
 */
exports.dashboardAddPlaybook = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * POST /
 * Add Playbooks
 */
exports.dashboardAddPlaybookSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Playbook.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};

/**
 * POST /
 * Search For Playbooks
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Playbook.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * RakshaSutra Playbook Page (New Method)
 */
exports.dashboardRakshaSutraPlaybook = async (req, res) => {
  res.render("dashboard/RakshaSutra_playbook", {
    title: "RakshaSutra Playbook",
    layout: "../views/layouts/dashboard",
  });
};
