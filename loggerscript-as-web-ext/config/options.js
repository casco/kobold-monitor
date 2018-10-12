
browser.storage.local.get("config").then(data => {
    var config = data.config;
    if (config) {
        document.getElementById("kobold-token").value = config.koboldToken;
    }
});

var saveConfiguration = function() {
    var config = {};
    config.koboldToken = document.getElementById("kobold-token").value;
};

document.getElementById("submit-button").addEventListener("click", event => {
    saveConfiguration();
});
