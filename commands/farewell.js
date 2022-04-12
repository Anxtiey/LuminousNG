module.exports = {
  name: "farewell",
  execute(client, player) {
    let farewells = [
      "Goodbye, " + player + ".",
      "See you later, " + player + ".",
      "Bye, " + player + ".",
      "Goodnight, " + player + ".",
      "Adios, " + player + ".",
    ];

    var randomFarewell = farewells[(Math.random() * farewells.length) | 0];

    client.queue("text", {
      type: "chat",
      needs_translation: false,
      source_name: client.username,
      xuid: "",
      platform_chat_id: "",
      message: randomFarewell,
    });
  },
};
