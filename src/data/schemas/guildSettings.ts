import { Schema, model } from 'mongoose';
import { IGuildSettings} from "../../interfaces/IGuildSettings";

const GuildSettingsSchema = new Schema<IGuildSettings>({
    _id: { type: String, required: true },
    welcomeChannel: { type: String },
    welcomeMessage: { type: String },
    roleMessage: [{channelId: String, messageId: String, role: [String], emojiName: [String] }]
});

const GuildSettings = model<IGuildSettings>('guildSettings', GuildSettingsSchema);

export { GuildSettings };
