_studyTimeList = "0, 3000";
_play_time = 3000;
last_position = 3000;
var key = k.replace(/-/gi, "").toLowerCase().padEnd(32, "0").substring(0, 32);


var studyInfo = new Object();
studyInfo.token = token;
studyInfo.orderPlayLogId = _orderPlayLogId;
studyInfo.orderForContentId = $("#section_" + _playContentId).data("ordercontentid");
studyInfo.lastPosition = last_position;
studyInfo.playTime = _play_time;
studyInfo.studyTimeList = _studyTimeList;
studyInfo.isPlayEnd = 'Y';
studyInfo.key = memoKey;

var result = JSON.stringify(studyInfo);

const cipher = CryptoJS.AES.encrypt(result, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16)),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
});

$.ajax({
    global: false,
    url: "/MyPage/SetOrderPlayLog",
    async: true,
    method: "POST",
    data: {
        studyInfo: cipher.toString(),
        s: s
    }
})
