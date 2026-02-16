
const { createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const player = createAudioPlayer();

player.on(AudioPlayerStatus.Idle, () => {});
player.on("error", e => console.error(e));

module.exports = { player, ytdl };
