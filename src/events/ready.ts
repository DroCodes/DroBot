import {Events} from "discord.js";
import {database} from '../data/database';


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: any) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        try {
            database()
        } catch (err) {
            console.log(err)
        }
    },
};