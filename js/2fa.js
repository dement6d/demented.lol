var epoch_server = new Date().getTime(); // supposed to be sent by server
var epoch_client = new Date().getTime();
var epoch_diff = epoch_server - epoch_client; //IF POSITIVE, CLIENT BEHIND

function getEpoch() {
    return (new Date().getTime()) + epoch_diff;
}

function isValid(secret) {
    return /^[a-z0-9]{16}$/g.test(secret)
}

function get2FASecretKey() {
    return document.getElementById("secret").value.replace(/[^a-z0-9]/gi, '')?.toLowerCase();
}

function update2FACode(secret, epoch) {
    var totp = new jsOTP.totp();
    var code = totp.getOtp(secret, epoch);
    var remaining = 30 - (Math.round(getEpoch() / 1000) % 30)

    var result = document.getElementById("code")
    var info = document.getElementById("info")

    if (result.innerText != code) result.innerText = code;
    result.style.color = (remaining <= 5 ? "#b00" : "inherit");
    info.innerText = "New code in " + remaining + " second" + (remaining > 1 ? "s" : "") + ".";
}

function copyCode() {
    var text = document.createElement('textarea');
    text.value = document.getElementById("code").innerText;
    document.body.appendChild(text)
    text.select()
    document.execCommand('copy');
    document.body.removeChild(text);
}

function check() {
    var secret = get2FASecretKey()
    var div_ids = ["code", "info", "copy"]
    if (isValid(secret)) {
        update2FACode(secret, getEpoch());
        div_ids.forEach(id => document.getElementById(id).style.display = "inherit");
    } else if (secret == "") {
        div_ids.forEach(id => document.getElementById(id).style.display = "none");
    } else {
        div_ids.forEach(id => document.getElementById(id).style.display = "none");
        document.getElementById("info").style.display = "inherit"
        document.getElementById("info").innerText = "Invalid secret key. It must be 16 characters long, only containing a-z and 0-9."
    }
}

setTimeout(function () {
    setInterval(function () {
        var secret = get2FASecretKey()
        if (isValid(secret)) update2FACode(secret, getEpoch());
    }, 1000);
}, 1000 - new Date().getMilliseconds())


document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const secret = params.get('secret');
    if (secret?.length) {
        document.getElementById('secret').value = secret;
        document.getElementById('secret').dispatchEvent(new Event('input'));
    }
});