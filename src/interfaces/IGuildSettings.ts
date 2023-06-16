import { IRoleMessage } from "./IRoleMessage";

export interface IGuildSettings {
    _id: string;
    welcomeChannel?: string;
    welcomeMessage?: string;
    roleMessage?: IRoleMessage[];
}