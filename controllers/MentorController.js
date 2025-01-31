const connection = require("../connection/MentorConnection");
const Format = require("../tools/format");

module.exports.getMentors = async (req, res) => {
	try {
		console.log("function starting");
		// Query data dari repo
		let mentors = await connection.getMentors(req.query);

		if (!mentors.bindings.length) {
			return res.status(200).json({
				data: [],
				message: "Data tidak ditemukan",
			});
		}

		mentors = mentors.bindings.map((mentor) => Format(mentor));

		if (req.params.id) {
			let mentor = mentors.filter((mentor) => {
				return mentor.id == req.params.id;
			});
			res.status(200).json({
				data: mentor[0],
				message: mentor.length
					? "Data mentor berhasil didapatkan"
					: "Tidak ada hasil dari pencarian",
			});
		} else {
			res.status(200).json({
				data: mentors,
				message: "Show all mentor",
			});
		}
	} catch (err) {
		res.status(400).json(err);
	}
};
