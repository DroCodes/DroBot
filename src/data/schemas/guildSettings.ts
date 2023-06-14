import { Schema, model } from 'mongoose';

interface IRoleEmoji {
    role: string;
    emojiName: string;
}

interface IGuildSettings {
    guildId: number;
    welcomeChannel?: number;
    roleEmoji?: IRoleEmoji[];
}

const GuildSettingsSchema = new Schema<IGuildSettings>({
    guildId: { type: Number, required: true },
    welcomeChannel: { type: Number },
    roleEmoji: [{ role: String, emojiName: String }]
});

const GuildSettings = model<IGuildSettings>('guildSettings', GuildSettingsSchema);

export { GuildSettings };
