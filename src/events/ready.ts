import {Events, Partials} from "discord.js";
import database from '../data/database'

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: any) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        try {
            await database.connect();
        } catch (err) {
            console.log(err)
        }
    },
};