const instance = new TypeIt("#myElement", { 
    // speed: 20,
    lifeLike: true,
})
    .type("Loading... Loading... Loading...")
    .break()
    .pause(2000)
    .type('<span style="color: red;">Bad... :(</span>')
    .go();