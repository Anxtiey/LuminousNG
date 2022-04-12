const axios = require("axios");

module.exports = {
  name: "stats",
  execute(client, player, game) {
    player = player.replace("_", " ");

    axios({
      method: "get",
      url: "https://apiv2.nethergames.org/v1/players/" + player,
    })
      .then((r) => {
        if (game === "bw" || game === "bedwars") {
          client.queue("text", {
            type: "chat",
            needs_translation: false,
            source_name: client.username,
            xuid: "",
            platform_chat_id: "",
            message: `${r.data.name} | Wins: ${r.data.extra.bwWins} | Beds: ${
              r.data.extra.bwBedsBroken
            } | Kills: ${r.data.extra.bwKills} | DEATHS: ${
              r.data.extra.bwDeaths
            } | KDR: ${
              Math.round((r.data.extra.bwKills / r.data.extra.bwDeaths) * 100) /
              100
            } | Finals: ${r.data.extra.bwFinalKills}`,
          });
        }

        if (game === "sw" || game === "skywars") {
          client.queue("text", {
            type: "chat",
            needs_translation: false,
            source_name: client.username,
            xuid: "",
            platform_chat_id: "",
            message: `${r.data.name} | Wins: ${r.data.extra.swWins} | Losses: ${
              r.data.extra.swLosses
            } | WLR: ${
              Math.round((r.data.extra.swWins / r.data.extra.swLosses) * 100) /
              100
            } | Kills: ${r.data.extra.swKills} | Deaths: ${
              r.data.extra.swDeaths
            } | KDR: ${
              Math.round((r.data.extra.swKills / r.data.extra.swDeaths) * 100) /
              100
            }`,
          });
        }

        if (game === "tb" || game === "bridge") {
          client.queue("text", {
            type: "chat",
            needs_translation: false,
            source_name: client.username,
            xuid: "",
            platform_chat_id: "",
            message: `${r.data.name} | Wins: ${r.data.extra.tbWins} | Losses: ${
              r.data.extra.tbLosses
            } | WLR: ${
              Math.round((r.data.extra.tbWins / r.data.extra.tbLosses) * 100) /
              100
            } | Goals: ${r.data.extra.tbGoals}`,
          });
        }
      })
      .catch((e) => {
        client.queue("text", {
          type: "chat",
          needs_translation: false,
          source_name: client.username,
          xuid: "",
          platform_chat_id: "",
          message: `That player does not exist.`,
        });
      });
  },
};
