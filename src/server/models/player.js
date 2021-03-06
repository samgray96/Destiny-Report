const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
	_id: String,
	last_date: {
		type: String,
		default: "1993-01-01T10:00:00Z"
	},
	leviathan: {
		flawless: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		dayOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		weekOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		fourMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		threeMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		twoMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		solo: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		}
	},
	EoW: {
		flawless: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		dayOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		weekOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		fourMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		threeMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		twoMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		solo: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		}
	},
	SoS: {
		flawless: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		dayOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		weekOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		fourMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		threeMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		twoMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		solo: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		}
	},
	lastWish: {
		flawless: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		dayOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		weekOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		fourMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		threeMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		twoMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		solo: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		}
	},
	SotP: {
		flawless: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		dayOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		weekOne: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		fourMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		threeMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		twoMan: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		},
		solo: {
			value: { type: Boolean, default: false },
			instanceId: { type: String, default: "" }
		}
	}
});

module.exports = mongoose.model("Player", playerSchema);
