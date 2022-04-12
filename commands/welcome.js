module.exports = {
  name: "welcome",
  execute(client, player) {
    let greetings = [
      "Welcome back, " + player + "!",
      "Greetings, " + player + ".",
      "Glad to see you again, " + player + ".",
      "Good afternoon, " + player + ".",
      "Hola, " + player + "!",
    ];

    var randomGreeting = greetings[(Math.random() * greetings.length) | 0];

    client.queue("text", {
      type: "chat",
      needs_translation: false,
      source_name: client.username,
      xuid: "",
      platform_chat_id: "",
      message: randomGreeting,
    });
  },
};
