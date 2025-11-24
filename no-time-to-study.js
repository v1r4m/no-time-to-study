var _playContentId = lastPlayContentId;
var _playSubsId = lastPlaySubsId;
var totalTime = $("#subs_" + _playSubsId).data("runningtime");
var key = k.replace(/-/gi, "").padEnd(32, "0").substring(0, 32);

var studyInfo = new Object();
studyInfo.orderSeriesId = orderSeriesId;
studyInfo.playlogId = playLogId;
studyInfo.playtimeAdd = totalTime;
studyInfo.studytimeListAdd = "0," + 3000;
studyInfo.lastPos = 3000;
studyInfo.playEnd = "Y";

var result = JSON.stringify(studyInfo);

const cipher = CryptoJS.AES.encrypt(result, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16)),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
});

$.ajax({
    url: "/Order/UpdatePlayLog",
    method: "POST",
    data: {
        studyInfo: cipher.toString(),
        a: "UpdatePlayLog",
        s: Date.now()
    }
})
