const axios = require("axios");

module.exports = {
  name: "guild",
  execute(client, guild) {
    axios({
      method: "get",
      url: "https://apiv2.nethergames.org/v1/guilds/" + guild,
    })
      .then((r) => {
        client.queue("text", {
          type: "chat",
          needs_translation: false,
          source_name: client.username,
          xuid: "",
          platform_chat_id: "",
          message: `${r.data.name} ${
            r.data.tag ? "[" + r.data.tag + "] " : ""
          }(#${r.data.position}) | Leader: ${r.data.leader} | Level: ${
            r.data.level
          } (${r.data.xpToNextLevel} XP until ${r.data.level + 1}) | ${
            r.data.memberCount
          }/${r.data.maxSize} members`,
        });
      })
      .catch((e) => {
        client.queue("text", {
          type: "chat",
          needs_translation: false,
          source_name: client.username,
          xuid: "",
          platform_chat_id: "",
          message: `That guild does not exist.`,
        });
      });
  },
};
