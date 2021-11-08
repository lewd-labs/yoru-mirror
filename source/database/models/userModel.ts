import { Document, model, Schema } from "mongoose"

interface baseSettingsInterface extends Document {
	id: string
	settings: Object
}

const schema: Schema = new Schema<baseSettingsInterface>(
	{
		/**
		 * @param {String} id
		 * @description The guild Id for this server
		 */
		id: {
			type: String,
			required: true,
		},
		/**
		 * @param {String} settings
		 * @description Settings object
		 */
		settings: {
			type: Object,
			require: true,
		},
	},
	{ minimize: false }
)

export const userModelSettings = model<baseSettingsInterface>(
	"succubus-user-settings",
	schema
)
